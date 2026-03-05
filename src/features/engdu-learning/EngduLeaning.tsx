import QuizPanel from './components/quiz-panel/QuizPanel';
import { useEffect, useRef, useState } from 'react';
import ReaderSection from './components/reader-section/ReaderSection';
import ConfettiEffect from '@/components/ConfettiEffect/ConfettiEffect';
import ProgressHeader from './components/progress-header/ProgressHeader';
import { useNavigate, useParams } from 'react-router';
import type { EngduQuestion } from '@/types/quiz';
import WaitModal from './components/WaitModal';
import { trackEvent, startRecording, stopRecording } from '@/utils/analytics';
import FeedbackModal from './components/FeedbackModal';
import { useEngduLearning } from '@/hooks/useEngduLearning';
import { toast } from 'sonner';

function EngduLearning() {
  const params = useParams();
  const engduId = Number(params.engduId);
  const navigate = useNavigate();

  const {
    engduDetail,
    isPendingDetail,
    isInitialGenerating,
    isCompleteGenerating,
    initialQuestions,
    completeQuestions,
    allQuestions,
    updateQuestion,
    isInitialTimeout,
    isCompleteTimeout,
    retryInitialPolling,
    retryCompletePolling,
  } = useEngduLearning(engduId);

  const [step, setStep] = useState<number>(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [isWaitModalOpen, setIsWaitModalOpen] = useState(false);

  const isStepInitialized = useRef(false);
  const mountTime = useRef(Date.now());
  const isMounted = useRef(true);

  useEffect(() => {
    if (!isPendingDetail && isInitialGenerating) {
      setIsWaitModalOpen(true);
    }
  }, [isPendingDetail, isInitialGenerating]);


  useEffect(() => {
    isMounted.current = true;
    startRecording();
    return () => {
      isMounted.current = false;
      stopRecording();
    };
  }, []);

  // 타임아웃 알림 토스트
  useEffect(() => {
    if (isInitialTimeout || isCompleteTimeout) {
      toast(
        <div className="flex flex-1 w-full flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            AI 콘텐츠 생성이 지연되고 있습니다<br />
            잠시만 더 기다려 보시거나, 나중에 다시 접속해 주세요.
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => {
                if (isInitialTimeout) retryInitialPolling();
                if (isCompleteTimeout) retryCompletePolling();
                toast.dismiss('ai-timeout-toast');
              }}
              className="w-full cursor-pointer rounded-lg bg-surface-brand-default py-3 text-white"
            >
              더 기다리기
            </button>
            <button
              onClick={() => {
                navigate('/');
                toast.dismiss('ai-timeout-toast');
              }}
              className="w-full cursor-pointer rounded-lg bg-surface-default py-3 text-text-secondary"
            >
              홈으로 가기
            </button>
          </div>
        </div>,
        {
          id: 'ai-timeout-toast',
          duration: Infinity,
          classNames: {
            content: '!flex-1 !w-full !min-w-0',
            title: '!w-full',
          }
        }
      );
    } else {
      toast.dismiss('ai-timeout-toast');
    }
  }, [isInitialTimeout, isCompleteTimeout, navigate, retryInitialPolling, retryCompletePolling]);

  useEffect(() => {
    if (engduDetail) {
      trackEvent('learning_page_enter', {
        engdu_id: engduId,
        is_new_creation: !engduDetail.parts.INITIAL,
      });
    }
  }, [engduId, !!engduDetail?.parts.INITIAL]);

  // 파트 생성 완료 트래킹
  const initialTracked = useRef(false);
  const completeTracked = useRef(false);

  useEffect(() => {
    if (engduDetail?.parts.INITIAL && !initialTracked.current) {
      initialTracked.current = true;
      trackEvent('initial_generate_success', {
        engdu_id: engduId,
        wait_duration_sec: Math.floor((Date.now() - mountTime.current) / 1000),
      });
    }

    if (engduDetail?.parts.COMPLETE && !completeTracked.current) {
      completeTracked.current = true;
      trackEvent('complete_generate_success', {
        engdu_id: engduId,
        arrival_at_quiz_index: step + 1,
        total_gen_duration_sec: Math.floor((Date.now() - mountTime.current) / 1000),
      });
    }
  }, [!!engduDetail?.parts.INITIAL, !!engduDetail?.parts.COMPLETE, engduId, step]);

  // 첫 미해결 문제로 스텝 초기화
  useEffect(() => {
    if (isStepInitialized.current || allQuestions.length === 0) return;

    const firstUnsolvedIdx = allQuestions.findIndex((q) => !q.isCorrected);
    setStep(firstUnsolvedIdx === -1 ? 0 : firstUnsolvedIdx);
    isStepInitialized.current = true;
  }, [allQuestions]);

  const handleQuestion = (questionId: number, isCorrected: boolean, answer: number) => {
    const quizIndex = allQuestions.findIndex((q) => q.questionId === questionId) + 1;

    trackEvent('quiz_submit_answer', {
      engdu_id: engduId,
      quiz_index: quizIndex,
      is_correct: isCorrected,
      is_complete_ready: !!engduDetail?.parts.COMPLETE,
    });

    // 캐시 업데이트
    updateQuestion(questionId, isCorrected, answer);

    // 첫 번째 파트의 마지막 문제를 맞췄을 때 축하 효과
    const isFirstPartLastQuestion = questionId === initialQuestions[initialQuestions.length - 1]?.questionId;
    if (isFirstPartLastQuestion && isCorrected) {
      setShowConfetti(true);
    }

    // 모든 파트의 모든 문제를 맞췄을 때 완료 이벤트
    const isLastQuestion = questionId === completeQuestions[completeQuestions.length - 1]?.questionId;
    if (isLastQuestion && isCorrected) {
      trackEvent('engdu_learning_complete', {
        engdu_id: engduId,
        total_learning_duration_min: Math.floor((Date.now() - mountTime.current) / 60000),
      });
    }
  };

  if (isPendingDetail) {
    return null;
  }

  return (
    <div className="relative flex h-[calc(100dvh-60px)] flex-col">
      <ProgressHeader
        title={engduDetail?.meta?.title}
        isInitialReady={!!engduDetail?.parts.INITIAL}
        isCompleteReady={!!engduDetail?.parts.COMPLETE}
        step={step}
        setStep={setStep}
        isQuestionsCorrected={allQuestions.map((q: EngduQuestion) => q.isCorrected)}
      />
      <div className="pointer-events-none absolute top-35 right-0 left-0 z-10 h-5 bg-surface-default" />
      <div className="grid h-full flex-1 snap-y snap-mandatory scroll-py-10 grid-cols-[7fr_5fr] gap-10 overflow-scroll px-25 py-10">
        <ReaderSection
          initialArticle={engduDetail?.parts.INITIAL?.article}
          completeArticle={engduDetail?.parts.COMPLETE?.article}
          isLocked={!initialQuestions.every((q: EngduQuestion) => q.isCorrected)}
          isAllSolved={
            initialQuestions.every((q: EngduQuestion) => q.isCorrected) &&
            completeQuestions.every((q: EngduQuestion) => q.isCorrected)
          }
        />
        <QuizPanel
          engduId={engduId}
          questions={allQuestions}
          step={step}
          setStep={setStep}
          handleQuestion={handleQuestion}
          isGenerating={isInitialGenerating || (step >= 2 && isCompleteGenerating)}
          onFinish={() => {
            if (engduDetail!.meta!.likeStatus === 'NONE') {
              setIsFeedbackModalOpen(true);
            } else {
              navigate('/');
            }
          }}
        />
      </div>
      {showConfetti && <ConfettiEffect />}
      {isWaitModalOpen && (
        <WaitModal
          isInitialResolved={!isInitialGenerating}
          onClose={() => setIsWaitModalOpen(false)}
        />
      )}
      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
        engduId={engduId}
      />
    </div>
  );
}

export default EngduLearning;
