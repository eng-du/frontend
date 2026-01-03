import type { DetailEngdu } from '@/types/engdu';
import ReadingCard from './ReadingCard';
import { useEffect, useRef } from 'react';

interface ReaderSectionProps {
  engdu: Omit<DetailEngdu, 'questions'>;
  isLocked: boolean;
}

function ReaderSection({ engdu, isLocked }: ReaderSectionProps) {
  const part1Ref = useRef<HTMLDivElement | null>(null);
  const part2Ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isLocked) {
      part2Ref.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [isLocked]);

  return (
    <div className="flex flex-col gap-10">
      <div ref={part1Ref}>
        <ReadingCard part={1} content={engdu.articles[0].content} />
      </div>
      {!isLocked && (
        <div ref={part2Ref}>
          <ReadingCard part={2} content={engdu.articles[1].content} />
        </div>
      )}
    </div>
  );
}

export default ReaderSection;
