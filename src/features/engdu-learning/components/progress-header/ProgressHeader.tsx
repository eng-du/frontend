import QuizStepper from './QuizStepper';
import { Suspense } from 'react';
import { Await } from 'react-router';
import type { EngduMeta, EngduPart } from '@/types/engdu';
import ProgressTitleSkeleton from '../skeleton/ProgressTitleSkeleton';

interface ProgressHeaderProps {
  metaPromise: Promise<EngduMeta>;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  isQuestionsCorrected: boolean[];
  part1Promise: Promise<EngduPart>;
  part2Promise: Promise<EngduPart>;
}
function ProgressHeader({
  metaPromise,
  step,
  setStep,
  isQuestionsCorrected,
  part1Promise,
  part2Promise,
}: ProgressHeaderProps) {
  return (
    <div className="grid h-35 w-full grid-cols-[7fr_5fr] gap-10 bg-surface-default px-25 pt-10">
      <div className="line-clamp-2 self-center font-pinkfong text-36">
        <Suspense fallback={<ProgressTitleSkeleton />}>
          <Await resolve={metaPromise}>{(meta: EngduMeta) => meta.title}</Await>
        </Suspense>
      </div>
      <QuizStepper
        step={step}
        setStep={setStep}
        isQuestionsCorrected={isQuestionsCorrected}
        part1Promise={part1Promise}
        part2Promise={part2Promise}
      />
    </div>
  );
}

export default ProgressHeader;
