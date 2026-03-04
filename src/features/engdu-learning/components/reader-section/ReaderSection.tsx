import { useEffect, useRef } from 'react';
import ReadingCard from './ReadingCard';
import ReadingCardSkeleton from '../skeleton/ReadingCardSkeleton';
import type { EngduArticle } from '@/types/engdu';

interface ReaderSectionProps {
  initialArticle?: EngduArticle;
  completeArticle?: EngduArticle;
  isLocked: boolean;
  isAllSolved: boolean;
  isCompleteGenerating: boolean;
}

function ReaderSection({
  initialArticle,
  completeArticle,
  isLocked,
  isAllSolved,
  isCompleteGenerating,
}: ReaderSectionProps) {
  const part1Ref = useRef<HTMLDivElement | null>(null);
  const part2Ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isAllSolved && !isLocked) {
      part2Ref.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [isLocked, isAllSolved]);

  return (
    <div className="flex flex-col gap-10">
      <div ref={part1Ref}>
        {!initialArticle ? (
          <ReadingCardSkeleton />
        ) : (
          <ReadingCard part={1} article={initialArticle} />
        )}
      </div>
      <div ref={part2Ref}>
        {isCompleteGenerating && !completeArticle && <ReadingCardSkeleton />}
        {!isLocked && completeArticle && (
          <ReadingCard part={2} article={completeArticle} />
        )}
      </div>
    </div>
  );
}

export default ReaderSection;
