import { StatCardSkeleton } from './StatCardSkeleton';
import { RankingItemSkeleton } from './RankingItemSkeleton';

function RankingSkeleton() {
  return (
    <div className="flex flex-col gap-4 w-full items-start">
      {/* 마이 랭킹 스켈레톤 */}
      <div className="flex flex-col gap-2 w-full items-start animate-pulse">
        <span className="font-pinkfong font-normal text-16 text-text-primary">마이 랭킹</span>
        <div className="grid grid-cols-2 gap-3 w-full">
          <StatCardSkeleton />
          <StatCardSkeleton />
        </div>
      </div>

      {/* top 5 명예의 전당 스켈레톤 */}
      <div className="flex flex-col gap-2.5 w-full items-start animate-pulse">
        <span className="font-pinkfong font-normal text-16 text-text-primary">
          top 5 명예의 전당
        </span>
        <div className="flex flex-col gap-3 w-full">
          {Array.from({ length: 5 }).map((_, idx) => (
            <RankingItemSkeleton key={idx} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default RankingSkeleton;
