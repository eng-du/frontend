import ProgressTitleSkeleton from './ProgressTitleSkeleton';
import QuizStepIndicatorSkeleton from './QuizStepIndicatorSkeleton';
import QuizCardSkeleton from './QuizCardSkeleton';
import ReadingCardSkeleton from './ReadingCardSkeleton';

function EngduLearningSkeleton() {
  return (
    <div className="relative flex h-full flex-col">
      <div className="grid h-35 w-full grid-cols-[7fr_5fr] gap-10 bg-surface-default px-25 pt-10">
        <ProgressTitleSkeleton />
        <div className="flex items-center gap-4 self-center">
          {Array.from({ length: 4 }).map((_, idx) => (
            <QuizStepIndicatorSkeleton key={idx} />
          ))}
        </div>
      </div>
      <div className="pointer-events-none absolute top-35 right-0 left-0 z-10 h-5 bg-surface-default" />
      <div className="grid h-full flex-1 grid-cols-[7fr_5fr] gap-10 overflow-hidden px-25 py-10">
        <ReadingCardSkeleton />
        <div className="sticky top-0 h-fit">
          <QuizCardSkeleton />
        </div>
      </div>
    </div>
  );
}

export default EngduLearningSkeleton;
