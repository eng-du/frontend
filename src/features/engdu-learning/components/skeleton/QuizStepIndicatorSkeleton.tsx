import Skeleton from '@/components/Skeleton/Skeleton';

function QuizStepIndicatorSkeleton() {
  return (
    <div className="flex flex-col items-center gap-2">
      <Skeleton className="h-13 w-13 rounded-full" />
      <Skeleton className="h-4 w-12" />
    </div>
  );
}

export default QuizStepIndicatorSkeleton;
