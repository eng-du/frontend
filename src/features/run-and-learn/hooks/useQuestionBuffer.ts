import { useState, useCallback, useRef, useEffect } from 'react';
import { getRunAndLearnQuestions } from '@/api/runAndLearn';
import type { RunAndLearnQuestionResponse } from '@/api/runAndLearn';
import { toast } from 'sonner';

export function useQuestionBuffer(sessionId: number | null) {
  const [buffer, setBuffer] = useState<RunAndLearnQuestionResponse[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  
  // 다음에 가져올 문제의 시작 인덱스
  const nextStartIndexRef = useRef(0);

  // 세션 ID가 초기화되거나 바뀌면 버퍼도 리셋
  useEffect(() => {
    setBuffer([]);
    nextStartIndexRef.current = 0;
  }, [sessionId]);

  const fetchQuestions = useCallback(async (count = 10) => {
    if (!sessionId || isFetching) return;

    try {
      setIsFetching(true);
      const newQuestions = await getRunAndLearnQuestions({
        sessionId,
        startIndex: nextStartIndexRef.current,
        count
      });
      
      setBuffer((prev) => [...prev, ...newQuestions]);
      nextStartIndexRef.current += count;
    } catch (err) {
      toast.error('문제 목록을 불러오는데 실패했습니다.');
    } finally {
      setIsFetching(false);
    }
  }, [sessionId, isFetching]);

  // 최초 로딩 (세션이 생성되고 버퍼가 비어있을 때 명시적으로 호출)
  const initializeBuffer = useCallback(async () => {
    if (!sessionId || nextStartIndexRef.current > 0) return;
    await fetchQuestions(10);
  }, [sessionId, fetchQuestions]);

  // 문제 소모 (맨 앞의 문제를 제거)
  const consumeQuestion = useCallback(() => {
    setBuffer((prev) => prev.slice(1));
  }, []);

  // 버퍼 갯수 감시: 3개 이하로 떨어지면 자동으로 백그라운드 Fetch 실행
  useEffect(() => {
    // 세션이 있고, 이미 초기 로딩을 1회 이상 진행(nextStartIndex > 0)했으며, 현재 페칭 중이 아닐 때
    if (sessionId && nextStartIndexRef.current > 0 && !isFetching) {
      if (buffer.length <= 3) {
        fetchQuestions(10); // 다음 10개 가져오기
      }
    }
  }, [buffer.length, isFetching, sessionId, fetchQuestions]);

  return {
    buffer,
    currentQuestion: buffer[0] ?? null,
    isFetching,
    consumeQuestion,
    initializeBuffer,
  };
}
