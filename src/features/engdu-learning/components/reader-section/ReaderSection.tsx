import { useEffect, useRef } from 'react';
import ReadingCard from './ReadingCard';
import ReadingCardSkeleton from '../skeleton/ReadingCardSkeleton';
import type { EngduArticle } from '@/types/engdu';
import ReadingContent from './ReadingContent';
import ReadingContentSkeleton from '../skeleton/ReadingContentSkeleton';

interface ReaderSectionProps {
  initialArticle?: EngduArticle;
  completeArticle?: EngduArticle;
  isLocked: boolean;
  isAllSolved: boolean;
  isMobile?: boolean;
  activePart?: 1 | 2;
  onPartChange?: (part: 1 | 2) => void;
}

function ReaderSection({
  initialArticle,
  completeArticle,
  isLocked,
  isAllSolved,
  isMobile,
  activePart = 1,
  onPartChange,
}: ReaderSectionProps) {
  const initialRef = useRef<HTMLDivElement | null>(null);
  const completeRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isAllSolved && !isLocked) {
      if (isMobile) {
        onPartChange?.(2);
      } else {
        completeRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
  }, [isLocked, isAllSolved, isMobile, onPartChange]);

  if (isMobile) {
    return (
      <>
        {activePart === 1 ? (
          !initialArticle ? (
            <ReadingContentSkeleton />
          ) : (
            <ReadingContent article={initialArticle} className="overflow-visible pr-0" />
          )
        ) : !completeArticle ? (
          <ReadingContentSkeleton />
        ) : (
          <ReadingContent article={completeArticle} className="overflow-visible pr-0" />
        )}
      </>
    );
  }

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
