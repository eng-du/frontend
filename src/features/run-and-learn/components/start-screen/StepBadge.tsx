import { cn } from '@/utils/cn';

interface StepBadgeProps {
  step: number;
  className?: string;
}

function StepBadge({ step, className }: StepBadgeProps) {
  return (
    <div
      className={cn(
        "bg-surface-brand-default flex items-center justify-center rounded-full w-6 h-6",
        className
      )}
    >
      <span className="font-bold text-16 text-text-weak leading-none">
        {step}
      </span>
    </div>
  );
}

export default StepBadge;
