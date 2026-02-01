import { Suspense } from 'react';
import { Await } from 'react-router';
import type { EngduPart } from '@/types/engdu';
import type { EngduQuestion } from '@/types/quiz';
import QuizCard from './QuizCard';
import QuizCardSkeleton from '../skeleton/QuizCardSkeleton';

interface QuizPanelProps {
  engduId: number;
  questions: EngduQuestion[];
  handleQuestion: (questionId: number, isCorrected: boolean, answer: number) => void;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  part1Promise: Promise<EngduPart>;
  part2Promise: Promise<EngduPart>;
  onFinish: () => void;
}

function QuizPanel({
  engduId,
  questions,
  handleQuestion,
  step,
  setStep,
  part1Promise,
  part2Promise,
  onFinish,
}: QuizPanelProps) {
  const isPart1 = step < 2;
  const targetPromise = isPart1 ? part1Promise : part2Promise;

  return (
    <div className="sticky top-0 h-fit">
      <Suspense fallback={<QuizCardSkeleton />}>
        <Await resolve={targetPromise}>
          {(resolvedPart: EngduPart) => {
            // Use local questions if available (for reactive updates),
            // otherwise use data from resolved promise.
            const question = questions[step] || resolvedPart.questions[step % 2];

            if (!question) return <QuizCardSkeleton />;

            return (
              <QuizCard
                key={question.questionId}
                engduId={engduId}
                questionId={question.questionId}
                question={question}
                handleQuestion={handleQuestion}
                step={step}
                setStep={setStep}
                onFinish={onFinish}
              />
            );
          }}
        </Await>
      </Suspense>
    </div>
  );
}

export default QuizPanel;
