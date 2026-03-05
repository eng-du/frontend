import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getEngduDetail, getEngduPart, postEngduPart, type EngduDetailResponse } from '@/api/engdu';
import type { EngduPartType, EngduPart, EngduMeta } from '@/types/engdu';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

export function useEngduLearning(engduId: number) {
  const queryClient = useQueryClient();
  const [isInitialTimeout, setIsInitialTimeout] = useState(false);
  const [isCompleteTimeout, setIsCompleteTimeout] = useState(false);

  // 1. 상세 정보 조회
  const { 
    data: engduDetail, 
    isPending: isPendingDetail, 
    isError: isErrorDetail,
    error: detailError
  } = useQuery({
    queryKey: ['engdu', engduId],
    queryFn: () => getEngduDetail(engduId),
    staleTime: 1000 * 60 * 5,
    retry: (failureCount, error) => {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const code = error.response?.data?.code;
        // 404(Not Found) 거나 403(Forbidden) 인 경우 재시도 생략
        if ((status === 404 && code === 'ENGDU-003') || (status === 403 && code === 'ENGDU-004')) {
          return false;
        }
      }
      return failureCount < 3; // 기본 3회 재시도
    }
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (isErrorDetail && axios.isAxiosError(detailError)) {
      const status = detailError.response?.status;
      const code = detailError.response?.data?.code;

      if ((status === 404 && code === 'ENGDU-003') || (status === 403 && code === 'ENGDU-004')) {
        toast.error('존재하지 않는 잉듀에 접근할 수 없습니다');
      } else {
        toast.error('잉듀를 불러오는 중 오류가 발생했습니다');
      }

      navigate('/');
    }
  }, [isErrorDetail, detailError, navigate]);

  const hasInitial = !!engduDetail?.parts?.INITIAL;
  const hasComplete = !!engduDetail?.parts?.COMPLETE;

  // 2. 파트 생성 요청 Mutation
  const { mutate: postEngduPartMutate } = useMutation({
    mutationFn: (partType: EngduPartType) => postEngduPart(engduId, partType),
  });

  const requestedRef = useRef<Record<EngduPartType, boolean>>({
    INITIAL: false,
    COMPLETE: false,
  });

  // 각 파트별 첫 응답 시점을 기록하여 2분 타임아웃 계산
  const pollingStartRef = useRef<Record<EngduPartType, number | null>>({
    INITIAL: null,
    COMPLETE: null,
  });

  // INITIAL 생성 요청
  useEffect(() => {
    if (!engduDetail || hasInitial || requestedRef.current.INITIAL) return;
    requestedRef.current.INITIAL = true;
    postEngduPartMutate('INITIAL');
  }, [engduDetail, hasInitial, postEngduPartMutate]);

  // INITIAL 폴링
  const { data: engduPartInitial } = useQuery({
    queryKey: ['engdu', engduId, 'part', 'INITIAL'],
    queryFn: () => getEngduPart(engduId, 'INITIAL'),
    enabled: !!engduDetail && !hasInitial && requestedRef.current.INITIAL,
    refetchInterval: (query) => {
      const state = query.state;
      const status = state.data?.status;
      if (status === 'DONE') return false;

      // 첫 응답이 성공적으로 온 시점 기록
      if (state.dataUpdatedAt > 0) {
        if (!pollingStartRef.current.INITIAL) {
          pollingStartRef.current.INITIAL = state.dataUpdatedAt;
        }
        // 2분(120초) 경과 시 폴링 중단 및 타임아웃 상태 설정
        const elapsed = Date.now() - pollingStartRef.current.INITIAL;
        if (elapsed > 120000) {
          setIsInitialTimeout(true);
          return false;
        }
      }
      return isInitialTimeout ? false : 2000;
    },
  });

  const retryInitialPolling = useCallback(() => {
    setIsInitialTimeout(false);
    pollingStartRef.current.INITIAL = Date.now();
    queryClient.invalidateQueries({ queryKey: ['engdu', engduId, 'part', 'INITIAL'] });
  }, [engduId, queryClient]);

  // COMPLETE 생성 요청 (INITIAL이 준비된 후)
  useEffect(() => {
    if (!engduDetail || !hasInitial || hasComplete || requestedRef.current.COMPLETE) return;
    requestedRef.current.COMPLETE = true;
    postEngduPartMutate('COMPLETE');
  }, [engduDetail, hasInitial, hasComplete, postEngduPartMutate]);

  // COMPLETE 폴링
  const { data: engduPartComplete } = useQuery({
    queryKey: ['engdu', engduId, 'part', 'COMPLETE'],
    queryFn: () => getEngduPart(engduId, 'COMPLETE'),
    enabled: !!engduDetail && hasInitial && !hasComplete && requestedRef.current.COMPLETE,
    refetchInterval: (query) => {
      const state = query.state;
      const status = state.data?.status;
      if (status === 'DONE') return false;

      // 첫 응답이 성공적으로 온 시점 기록
      if (state.dataUpdatedAt > 0) {
        if (!pollingStartRef.current.COMPLETE) {
          pollingStartRef.current.COMPLETE = state.dataUpdatedAt;
        }
        // 2분(120초) 경과 시 폴링 중단 및 타임아웃 상태 설정
        const elapsed = Date.now() - pollingStartRef.current.COMPLETE;
        if (elapsed > 120000) {
          setIsCompleteTimeout(true);
          return false;
        }
      }
      return isCompleteTimeout ? false : 2000;
    },
  });

  const retryCompletePolling = useCallback(() => {
    setIsCompleteTimeout(false);
    pollingStartRef.current.COMPLETE = Date.now();
    queryClient.invalidateQueries({ queryKey: ['engdu', engduId, 'part', 'COMPLETE'] });
  }, [engduId, queryClient]);

  // 폴링 완료 시 잉듀 상세 정보 업데이트
  useEffect(() => {
    const updateCache = (partType: EngduPartType, part: EngduPart, meta?: EngduMeta) => {
      queryClient.setQueryData<EngduDetailResponse>(['engdu', engduId], (prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          meta: meta ?? prev.meta,
          parts: {
            ...prev.parts,
            [partType]: part,
          },
        };
      });
    };

    if (engduPartInitial?.status === 'DONE' && engduPartInitial.data && !hasInitial) {
      const metaWithLikeStatus: EngduMeta = {
        ...engduPartInitial.data.meta,
        likeStatus: 'NONE',
      };
      updateCache('INITIAL', engduPartInitial.data.part, metaWithLikeStatus);
    }

    if (engduPartComplete?.status === 'DONE' && engduPartComplete.data && !hasComplete) {
      updateCache('COMPLETE', engduPartComplete.data.part);
    }
  }, [engduPartInitial, engduPartComplete, queryClient, engduId, hasInitial, hasComplete]);

  // 질문 리스트
  const initialQuestions = engduDetail?.parts.INITIAL?.questions || [];
  const completeQuestions = engduDetail?.parts.COMPLETE?.questions || [];
  const allQuestions = [...initialQuestions, ...completeQuestions];

  // 질문별 정답 여부 업데이트
  const updateQuestion = useCallback(
    (questionId: number, isCorrected: boolean, answer: number) => {
      queryClient.setQueryData<EngduDetailResponse>(['engdu', engduId], (prev) => {
        if (!prev) return prev;

        const updatePart = (part: EngduPart | null) => {
          if (!part) return null;
          return {
            ...part,
            questions: part.questions.map((q) =>
              q.questionId === questionId ? { ...q, isCorrected, answer } : q,
            ),
          };
        };

        return {
          ...prev,
          parts: {
            INITIAL: updatePart(prev.parts.INITIAL),
            COMPLETE: updatePart(prev.parts.COMPLETE),
          },
        };
      });
    },
    [engduId, queryClient],
  );

  return {
    engduDetail,
    isPendingDetail,
    isErrorDetail,
    isInitialGenerating: !hasInitial && engduPartInitial?.status !== 'DONE',
    isCompleteGenerating: !hasComplete && engduPartComplete?.status !== 'DONE',
    initialQuestions,
    completeQuestions,
    allQuestions,
    updateQuestion,
    isInitialTimeout,
    isCompleteTimeout,
    retryInitialPolling,
    retryCompletePolling,
  };
}