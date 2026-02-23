import QuizPanel from './components/quiz-panel/QuizPanel';
import { useEffect, useRef, useState, useEffectEvent } from 'react';
import ReaderSection from './components/reader-section/ReaderSection';
import ConfettiEffect from '@/components/ConfettiEffect/ConfettiEffect';
import ProgressHeader from './components/progress-header/ProgressHeader';
import { useNavigate, useLoaderData } from 'react-router';
import type { EngduQuestion } from '@/types/quiz';
import type { EngduPart, EngduMeta, LikeStatus } from '@/types/engdu';
import WaitModal from './components/WaitModal';
import { trackEvent, startRecording, stopRecording } from '@/utils/analytics';
import FeedbackModal from './components/FeedbackModal';

function EngduLearning() {
  const { engduId, meta, part1, part2, initial } = useLoaderData() as {
    engduId: number;
    meta: Promise<EngduMeta>;
    part1: Promise<EngduPart>;
    part2: Promise<EngduPart>;
    initial: { isPart1Ready: boolean; isPart2Ready: boolean };
  };

  const [isWaitModalOpen, setIsWaitModalOpen] = useState(!initial.isPart1Ready);
  const [isPart1Resolved, setIsPart1Resolved] = useState(initial.isPart1Ready);
  const [isPart2Resolved, setIsPart2Resolved] = useState(initial.isPart2Ready);
  const [localQuestions, setLocalQuestions] = useState<EngduQuestion[]>([]);
  const [step, setStep] = useState<number>(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
  const [currentLikeStatus, setCurrentLikeStatus] = useState<LikeStatus>('NONE');
  const navigate = useNavigate();
  const isInitialUnlocked = useRef<boolean | null>(null);
  const isStepInitialized = useRef(false);
  const mountTime = useRef(Date.now());
  const isMounted = useRef(true);

  useEffect(() => {
    meta.then((data) => {
      setCurrentLikeStatus(data.likeStatus);
    });
  }, [meta]);

  useEffect(() => {
    isMounted.current = true; // Strict Mode 등에서 cleanup 후 다시 mount될 때를 대비해 true로 다시 설정
    startRecording();
    return () => {
      isMounted.current = false;
      stopRecording();
    };
  }, []);

  useEffect(() => {
    trackEvent('learning_page_enter', {
      engdu_id: engduId,
      is_new_creation: !initial.isPart1Ready,
    });
  }, [engduId, initial.isPart1Ready]);

  // part1 성공 알림
  const onPart1GenerateSuccess = useEffectEvent(() => {
    if (isMounted.current && !isPart1Resolved) {
      trackEvent('part1_generate_success', {
        engdu_id: engduId,
        wait_duration_sec: Math.floor((Date.now() - mountTime.current) / 1000),
      });
      setIsPart1Resolved(true);
    }
  });

  // part1이 완료되면 퀴즈 상태 동기화 및 완료 상태 업데이트
  useEffect(() => {
    part1.then((p1) => {
      onPart1GenerateSuccess();
      setLocalQuestions((prev) => (prev.length < 2 ? [...p1.questions] : prev));
      if (isInitialUnlocked.current === null) {
        isInitialUnlocked.current = p1.questions[1]?.isCorrected;
      }
    });
  }, [part1]);

  // part2 성공 알림
  const onPart2GenerateSuccess = useEffectEvent((durationSec: number) => {
    if (isMounted.current && !isPart2Resolved) {
      trackEvent('part2_generate_success', {
        engdu_id: engduId,
        arrival_at_quiz_index: step + 1,
        total_gen_duration_sec: durationSec,
      });
      setIsPart2Resolved(true);
    }
  });

  // part2가 완료되면 퀴즈 상태 동기화
  useEffect(() => {
    part2.then(() => {
      onPart2GenerateSuccess(Math.floor((Date.now() - mountTime.current) / 1000));
    });

    Promise.all([part1, part2]).then(([p1, p2]) => {
      setLocalQuestions((prev) => {
        // 이미 4개의 문제를 가지고 있다면 아무것도 하지 않음
        if (prev.length >= 4) return prev;

        // Part 1만 가지고 있다면 (길이 2), Part 2 데이터 추가
        if (prev.length === 2) {
          return [...prev, ...p2.questions];
        }

        // 만약 아무것도 없었다면, 두 파트 데이터 모두 설정
        if (prev.length < 2) {
          return [...p1.questions, ...p2.questions];
        }

        return prev;
      });
    });
  }, [part1, part2]);

  useEffect(() => {
    if (isStepInitialized.current || localQuestions.length === 0) return;

    const firstUnsolvedIdx = localQuestions.findIndex((q) => !q.isCorrected);
    setStep(firstUnsolvedIdx === -1 ? 0 : firstUnsolvedIdx);
    isStepInitialized.current = true;
  }, [localQuestions]);

  const handleQuestion = (questionId: number, isCorrected: boolean, answer: number) => {
    const quizIndex = localQuestions.findIndex((q) => q.questionId === questionId) + 1;

    trackEvent('quiz_submit_answer', {
      engdu_id: engduId,
      quiz_index: quizIndex,
      is_correct: isCorrected,
      is_part2_ready: isPart2Resolved,
    });

    setLocalQuestions((prev) =>
      prev.map((q) => (q.questionId === questionId ? { ...q, isCorrected, answer } : q)),
    );

    if (questionId === localQuestions[1]?.questionId && isCorrected && !isInitialUnlocked.current) {
      setShowConfetti(true);
    }

    // 모든 문제가 정답이면 완료 이벤트
    if (quizIndex === 4 && isCorrected) {
      trackEvent('engdu_learning_complete', {
        engdu_id: engduId,
        total_learning_duration_min: Math.floor((Date.now() - mountTime.current) / 60000),
      });
    }
  };

  return (
    <div className="relative flex h-full flex-col">
      <ProgressHeader
        metaPromise={meta}
        step={step}
        setStep={setStep}
        isQuestionsCorrected={localQuestions.map((q) => q.isCorrected)}
        part1Promise={part1}
        part2Promise={part2}
      />
      <div className="pointer-events-none absolute top-35 right-0 left-0 z-10 h-5 bg-surface-default" />
      <div className="grid h-full flex-1 snap-y snap-mandatory scroll-py-10 grid-cols-[7fr_5fr] gap-10 overflow-scroll px-25 py-10">
        <ReaderSection
          part1Promise={part1}
          part2Promise={part2}
          isLocked={localQuestions.length < 2 || !localQuestions[1]?.isCorrected}
          isAllSolved={localQuestions.length === 4 && localQuestions.every((q) => q.isCorrected)}
        />
        <QuizPanel
          engduId={engduId}
          questions={localQuestions}
          step={step}
          setStep={setStep}
          handleQuestion={handleQuestion}
          part1Promise={part1}
          part2Promise={part2}
          onFinish={() => {
            if (currentLikeStatus === 'NONE') {
              setIsFeedbackModalOpen(true);
            } else {
              navigate('/');
            }
          }}
        />
      </div>
      {showConfetti && <ConfettiEffect />}
      {isWaitModalOpen && (
        <WaitModal isPart1Resolved={isPart1Resolved} onClose={() => setIsWaitModalOpen(false)} />
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
