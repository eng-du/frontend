import { Suspense } from 'react';
import { Await } from 'react-router';
import type { EngduPart } from '@/types/engdu';
import QuizStepIndicatorSkeleton from '../skeleton/QuizStepIndicatorSkeleton';
import QuizStepIndicator from './QuizStepIndicator';

interface QuizStepperProps {
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  isQuestionsCorrected: boolean[];
  part1Promise: Promise<EngduPart>;
  part2Promise: Promise<EngduPart>;
}

function QuizStepper({
  step,
  setStep,
  isQuestionsCorrected,
  part1Promise,
  part2Promise,
}: QuizStepperProps) {
  return (
    <div className="flex items-center gap-4 self-center">
      <Suspense
        fallback={
          <>
            <QuizStepIndicatorSkeleton />
            <QuizStepIndicatorSkeleton />
          </>
        }
      >
        <Await resolve={part1Promise}>
          {() => (
            <>
              {[0, 1].map((idx) => {
                const isCorrected = isQuestionsCorrected[idx] ?? false;
                const isReachable = idx === 0 || isQuestionsCorrected[idx - 1];
                return (
                  <QuizStepIndicator
                    key={idx}
                    step={idx}
                    isLocked={!isReachable}
                    isCorrected={isCorrected}
                    isActive={step === idx}
                    setStep={setStep}
                  />
                );
              })}
            </>
          )}
        </Await>
      </Suspense>

      <Suspense
        fallback={
          <>
            <QuizStepIndicatorSkeleton />
            <QuizStepIndicatorSkeleton />
          </>
        }
      >
        <Await resolve={part2Promise}>
          {() => (
            <>
              {[2, 3].map((idx) => {
                const isCorrected = isQuestionsCorrected[idx] ?? false;
                const isReachable = isQuestionsCorrected[idx - 1];
                return (
                  <QuizStepIndicator
                    key={idx}
                    step={idx}
                    isLocked={!isReachable}
                    isCorrected={isCorrected}
                    isActive={step === idx}
                    setStep={setStep}
                  />
                );
              })}
            </>
          )}
        </Await>
      </Suspense>
    </div>
  );
}

export default QuizStepper;
