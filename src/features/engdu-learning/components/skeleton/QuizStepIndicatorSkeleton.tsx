import Skeleton from '@/components/Skeleton/Skeleton';

interface QuizStepIndicatorSkeletonProps {
  isDesktop?: boolean;
}

function QuizStepIndicatorSkeleton({ isDesktop = true }: QuizStepIndicatorSkeletonProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <Skeleton className={isDesktop ? 'h-14 w-14 rounded-full' : 'h-11 w-11 rounded-full'} />
      <Skeleton className={isDesktop ? 'h-4 w-12' : 'h-3 w-10'} />
    </div>
  );
}

export default QuizStepIndicatorSkeleton;
