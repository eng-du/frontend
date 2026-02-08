import QuizPanel from './components/quiz-panel/QuizPanel';
import { useEffect, useRef, useState } from 'react';
import ReaderSection from './components/reader-section/ReaderSection';
import ConfettiEffect from '@/components/ConfettiEffect/ConfettiEffect';
import ProgressHeader from './components/progress-header/ProgressHeader';
import { useLoaderData } from 'react-router';
import type { EngduQuestion } from '@/types/quiz';
import type { EngduPart, EngduMeta } from '@/types/engdu';

function EngduLearning() {
  const { engduId, meta, part1, part2 } = useLoaderData() as {
    engduId: number;
    meta: Promise<EngduMeta>;
    part1: Promise<EngduPart>;
    part2: Promise<EngduPart>;
  };

  const [localQuestions, setLocalQuestions] = useState<EngduQuestion[]>([]);
  const [step, setStep] = useState<number>(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const isInitialUnlocked = useRef<boolean | null>(null);
  const isStepInitialized = useRef(false);

  // part1이 완료되면 퀴즈 상태 동기화
  useEffect(() => {
    part1.then((p1) => {
      setLocalQuestions((prev) => (prev.length < 2 ? [...p1.questions] : prev));
      if (isInitialUnlocked.current === null) {
        isInitialUnlocked.current = p1.questions[1]?.isCorrected;
      }
    });
  }, [part1]);

  // part2가 완료되면 퀴즈 상태 동기화
  useEffect(() => {
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
    setLocalQuestions((prev) =>
      prev.map((q) => (q.questionId === questionId ? { ...q, isCorrected, answer } : q)),
    );

    if (questionId === localQuestions[1]?.questionId && isCorrected && !isInitialUnlocked.current) {
      setShowConfetti(true);
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
        />
      </div>
      {showConfetti && <ConfettiEffect />}
    </div>
  );
}

export default EngduLearning;
