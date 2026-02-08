import Card from '@/components/Card/Card';
import { cn } from '@/utils/cn';
import Skeleton from '@/components/Skeleton/Skeleton';

function ReadingCardSkeleton() {
  return (
    <Card className="flex h-[calc(100dvh-280px)] w-full snap-start flex-col gap-6">
      <Skeleton className="h-6 w-16 rounded-xl" />
      <div className="scrollbar-custom flex w-full flex-col gap-5 overflow-hidden pr-4">
        {Array.from({ length: 6 }).map((_, idx) => (
          <Skeleton
            key={idx}
            className={cn('h-8', idx % 4 === 0 ? 'w-full' : idx % 3 === 0 ? 'w-11/12' : 'w-10/12')}
          />
        ))}
      </div>
    </Card>
  );
}

export default ReadingCardSkeleton;
