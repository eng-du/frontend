import { useEffect, useRef } from 'react';
import ReadingCard from './ReadingCard';
import ReadingCardSkeleton from '../skeleton/ReadingCardSkeleton';
import type { EngduArticle } from '@/types/engdu';

interface ReaderSectionProps {
  initialArticle?: EngduArticle;
  completeArticle?: EngduArticle;
  isLocked: boolean;
  isAllSolved: boolean;
}

function ReaderSection({
  initialArticle,
  completeArticle,
  isLocked,
  isAllSolved,
}: ReaderSectionProps) {
  const initialRef = useRef<HTMLDivElement | null>(null);
  const completeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isAllSolved && !isLocked) {
      completeRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [isLocked, isAllSolved]);

  return (
    <div className="flex flex-col gap-10">
      <div ref={initialRef}>
        {!initialArticle ? (
          <ReadingCardSkeleton />
        ) : (
          <ReadingCard part={1} article={initialArticle} />
        )}
      </div>
      <div ref={completeRef}>
        {!isLocked &&
          (!completeArticle ? (
            <ReadingCardSkeleton />
          ) : (
            <ReadingCard part={2} article={completeArticle} />
          ))}
      </div>
    </div>
  );
}

export default ReaderSection;
