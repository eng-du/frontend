import { cn } from '@/utils/cn';
import Skeleton from '@/components/Skeleton/Skeleton';

interface ReadingContentSkeletonProps {
  className?: string;
}

function ReadingContentSkeleton({ className }: ReadingContentSkeletonProps) {
  return (
    <div
      className={cn(
        'scrollbar-custom flex w-full flex-1 flex-col gap-5 overflow-hidden pr-4',
        className,
      )}
    >
      {Array.from({ length: 12 }).map((_, idx) => (
        <Skeleton
          key={idx}
          className={cn(
            'h-8 shrink-0',
            idx % 4 === 0 ? 'w-full' : idx % 3 === 0 ? 'w-11/12' : 'w-10/12',
          )}
        />
      ))}
    </div>
  );
}

export default ReadingContentSkeleton;
