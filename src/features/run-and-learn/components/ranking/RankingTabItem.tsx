import { cn } from '@/utils/cn';

interface RankingTabItemProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  className?: string;
}

function RankingTabItem({ label, selected, onClick, className }: RankingTabItemProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-[135px] h-10 flex items-center justify-center rounded-lg font-pretendard font-medium text-16 transition-colors duration-200 cursor-pointer border-0 outline-none',
        selected
          ? 'bg-surface-brand-default text-text-weak'
          : 'bg-surface-weak text-text-secondary hover:bg-surface-strong',
        className
      )}
    >
      {label}
    </button>
  );
}

export default RankingTabItem;
