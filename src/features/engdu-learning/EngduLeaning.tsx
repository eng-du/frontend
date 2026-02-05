import QuizPanel from './components/quiz-panel/QuizPanel';
import { useEffect, useRef, useState } from 'react';
import ReaderSection from './components/reader-section/ReaderSection';
import ConfettiEffect from '@/components/ConfettiEffect/ConfettiEffect';
import ProgressHeader from './components/progress-header/ProgressHeader';
import { useParams } from 'react-router';
import { getEngduDetail } from '@/api/engdu';
import type { DetailEngdu } from '@/types/engdu';

function EngduLearning() {
  const { engduId } = useParams();
  const [engdu, setEngdu] = useState<DetailEngdu | null>(null);
  const [step, setStep] = useState<number>(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const isInitialUnlocked = useRef<boolean | null>(null);

  useEffect(() => {
    (async () => {
      const engdu = await getEngduDetail(Number(engduId));
      setEngdu(engdu);

      if (isInitialUnlocked.current === null) {
        isInitialUnlocked.current = engdu.questions[1].isCorrected;
      }

      const firstUnsolvedIdx = engdu.questions.findIndex((q) => !q.isCorrected);
      setStep(firstUnsolvedIdx === -1 ? 0 : firstUnsolvedIdx);
    })();
  }, [engduId]);

  const handleQuestion = (questionId: number, isCorrected: boolean, answer: number) => {
    setEngdu((prevEngdu) => {
      if (!prevEngdu) return prevEngdu;

      if (
        questionId === prevEngdu.questions[1].questionId &&
        isCorrected &&
        !isInitialUnlocked.current
      ) {
        setShowConfetti(true);
      }

      return {
        ...prevEngdu,
        questions: prevEngdu.questions.map((question) =>
          question.questionId === questionId
            ? {
                ...question,
                isCorrected,
                answer,
              }
            : question,
        ),
      };
    });
  };

  return engdu ? (
    <div className="relative flex h-full flex-col">
      <ProgressHeader
        title={engdu.title}
        step={step}
        setStep={setStep}
        isQuestionsCorrected={engdu.questions.map((question) => question.isCorrected)}
      />
      <div className="pointer-events-none absolute top-35 right-0 left-0 z-10 h-5 bg-surface-default" />
      <div className="grid h-full flex-1 snap-y snap-mandatory scroll-py-10 grid-cols-[7fr_5fr] gap-10 overflow-scroll px-25 py-10">
        <ReaderSection
          engdu={engdu}
          isLocked={!engdu.questions[1].isCorrected}
          isAllSolved={engdu.questions.every((q) => q.isCorrected)}
        />
        <QuizPanel
          engduId={engdu.engduId}
          questions={engdu.questions}
          step={step}
          setStep={setStep}
          handleQuestion={handleQuestion}
        />
      </div>
      {showConfetti && <ConfettiEffect />}
    </div>
  ) : null;
}

export default EngduLearning;
