import imgRibbon from '@/assets/icons/medal-ribbon.svg';
import { cn } from '@/utils/cn';

interface MedalProps {
  rank: 1 | 2 | 3;
  className?: string;
}

const MEDAL_COLORS = {
  1: 'bg-[#e6b231]', // Gold
  2: 'bg-[#a0aec0]', // Silver
  3: 'bg-[#ed8936]', // Bronze
};

function Medal({ rank, className }: MedalProps) {
  const bgColor = MEDAL_COLORS[rank];

  return (
    <div className={cn('relative w-6 h-[33px]', className)}>
      <div className="absolute left-[6px] top-[22px] w-3 h-[11px]">
        <img alt="" className="absolute block inset-0 w-full h-full" src={imgRibbon} />
      </div>
      <div className={cn('absolute top-0 left-0 w-6 h-6 flex items-center justify-center rounded-full', bgColor)}>
        <span className="font-pretendard font-bold text-16 text-text-weak">
          {rank}
        </span>
      </div>
    </div>
  );
}

export default Medal;
