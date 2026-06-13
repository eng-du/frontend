import Medal from './Medal';
import { cn } from '@/utils/cn';

interface RankingItemProps {
  rank: number;
  nickname: string;
  score: number;
  isMyRanking?: boolean;
  className?: string;
}

function RankingItem({ rank, nickname, score, isMyRanking = false, className }: RankingItemProps) {
  const isMedal = rank >= 1 && rank <= 3;

  return (
    <div
      className={cn(
        'w-full max-w-[760px] h-[60px] flex items-center justify-between px-5 border rounded-xl overflow-hidden',
        isMyRanking
          ? 'bg-surface-brand-weak border-border-brand-weak'
          : 'bg-surface-weak border-border-default',
        className
      )}
    >
      <div className="flex gap-3 items-center min-w-0 flex-1 mr-2">
        {isMedal ? (
          <Medal rank={rank as 1 | 2 | 3} className="shrink-0" />
        ) : (
          <span className="w-6 text-center font-pretendard font-bold text-16 text-text-primary shrink-0">
            {rank}
          </span>
        )}
        <span className="font-pretendard font-medium text-16 text-text-primary truncate">
          {nickname}
        </span>
      </div>
      <span className="font-pretendard font-medium text-16 text-text-brand-primary shrink-0 whitespace-nowrap">
        {score}점
      </span>
    </div>
  );
}

export default RankingItem;
