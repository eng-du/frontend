import Skeleton from '@/components/Skeleton/Skeleton';

function QuizContentSkeleton() {
  return (
    <div className="flex w-full flex-col gap-6">
      <Skeleton className="h-8 w-3/4" />
      <ul className="flex w-full flex-col gap-2.5">
        {Array.from({ length: 4 }).map((_, idx) => (
          <Skeleton key={idx} className="h-14 w-full rounded-xl" />
        ))}
      </ul>
      <Skeleton className="h-14 w-full rounded-xl" />
    </div>
  );
}

export default QuizContentSkeleton;
