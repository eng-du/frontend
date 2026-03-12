import Card from '@/components/Card/Card';
import Skeleton from '@/components/Skeleton/Skeleton';
import ReadingContentSkeleton from './ReadingContentSkeleton';

function ReadingCardSkeleton() {
  return (
    <Card className="flex h-[calc(100dvh-280px)] w-full snap-start flex-col gap-6">
      <Skeleton className="h-6 w-16 rounded-xl" />
      <ReadingContentSkeleton className="flex-1" />
    </Card>
  );
}

export default ReadingCardSkeleton;
