import { cn } from '@/utils/cn';
import type { ReactNode } from 'react';

interface FeedbackTypeButtonProps {
  label: string;
  icon: ReactNode;
  isActive: boolean;
  onClick: () => void;
  variant: 'liked' | 'disliked';
  disabled?: boolean;
}

export default function FeedbackTypeButton({
  label,
  icon,
  isActive,
  onClick,
  variant,
  disabled,
}: FeedbackTypeButtonProps) {
  const activeButtonStyles = {
    liked: 'border-border-positive bg-surface-positive text-text-positive',
    disliked: 'border-border-danger bg-surface-danger text-text-danger',
  };

  const activeIconStyles = {
    liked: 'bg-white border-2 border-border-positive text-text-positive',
    disliked: 'bg-white border-2 border-border-danger text-text-danger',
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'flex aspect-5/3 flex-1 flex-col items-center justify-center gap-3 rounded-2xl border-2 p-4 transition-colors',
        isActive
          ? activeButtonStyles[variant]
          : 'border-border-default bg-surface-weak text-text-secondary',
        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
      )}
    >
      <div
        className={cn(
          'flex h-15 w-15 items-center justify-center rounded-full',
          isActive ? activeIconStyles[variant] : 'bg-surface-strong',
        )}
      >
        <div>{icon}</div>
      </div>
      <span className="font-bold">{label}</span>
    </button>
  );
}
