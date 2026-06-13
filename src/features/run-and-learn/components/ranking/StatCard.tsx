import { cn } from '@/utils/cn';

interface StatCardProps {
  type: 'rank' | 'score';
  value?: number | null;
  className?: string;
}

function StatCard({ type, value, className }: StatCardProps) {
  const title = type === 'rank' ? '내 순위' : '내 점수';
  
  const formattedValue =
    value === undefined || value === null || value === 0
      ? (type === 'rank' ? '-' : '0점')
      : (type === 'rank' ? `${value}위` : `${value}점`);

  return (
    <div
      className={cn(
        'w-36 h-20 flex flex-col gap-2 items-start justify-center px-4 py-3 bg-surface-weak border border-border-default rounded-xl font-pretendard font-medium',
        className
      )}
    >
      <span className="text-12 text-text-secondary">{title}</span>
      <span className="text-20 text-text-brand-primary font-bold">{formattedValue}</span>
    </div>
  );
}

export default StatCard;
