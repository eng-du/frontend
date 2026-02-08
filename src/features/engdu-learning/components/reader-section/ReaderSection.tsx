import { Suspense, useEffect, useRef } from 'react';
import ReadingCard from './ReadingCard';
import { Await } from 'react-router';
import type { EngduPart } from '@/types/engdu';
import ReadingCardSkeleton from '../skeleton/ReadingCardSkeleton';

interface ReaderSectionProps {
  part1Promise: Promise<EngduPart>;
  part2Promise: Promise<EngduPart>;
  isLocked: boolean;
  isAllSolved: boolean;
}

function ReaderSection({ part1Promise, part2Promise, isLocked, isAllSolved }: ReaderSectionProps) {
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
        <Suspense fallback={<ReadingCardSkeleton />}>
          <Await resolve={part1Promise}>
            {(p1: EngduPart) => <ReadingCard part={1} article={p1.article} />}
          </Await>
        </Suspense>
      </div>
      <div ref={part2Ref}>
        {!isLocked && (
          <Suspense fallback={<ReadingCardSkeleton />}>
            <Await resolve={part2Promise}>
              {(p2: EngduPart) => <ReadingCard part={2} article={p2.article} />}
            </Await>
          </Suspense>
        )}
      </div>
    </div>
  );
}

export default ReaderSection;
