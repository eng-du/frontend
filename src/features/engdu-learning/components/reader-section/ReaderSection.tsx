import type { DetailEngdu } from '@/types/engdu';
import ReadingCard from './ReadingCard';
import { useEffect, useRef } from 'react';

interface ReaderSectionProps {
  engdu: Omit<DetailEngdu, 'questions'>;
  isLocked: boolean;
  isAllSolved: boolean;
}

function ReaderSection({ engdu, isLocked, isAllSolved }: ReaderSectionProps) {
  const part1Ref = useRef<HTMLDivElement | null>(null);
  const part2Ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isAllSolved && !isLocked) {
      part2Ref.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [isLocked]);

  return (
    <div className="flex flex-col gap-10">
      <div ref={part1Ref}>
        <ReadingCard part={1} article={engdu.articles[0]} />
      </div>
      {!isLocked && (
        <div ref={part2Ref}>
          <ReadingCard part={2} article={engdu.articles[1]} />
        </div>
      )}
    </div>
  );
}

export default ReaderSection;
