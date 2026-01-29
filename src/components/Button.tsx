import { cn } from '@/utils/cn';
import type { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  type?: 'primary' | 'secondary';
  style?: 'fill' | 'ghost';
  onClickHandler?: () => void;
  disabled?: boolean;
  className?: string;
}

function Button({
  children,
  type = 'primary',
  style = 'fill',
  onClickHandler,
  disabled = false,
  className,
}: ButtonProps) {
  return (
    <button
      className={cn(
        'flex cursor-pointer items-center',
        type === 'primary'
          ? 'h-14 w-full justify-center gap-2 rounded-2xl px-5'
          : 'h-10.5 w-40 justify-between rounded-xl px-5',
        style === 'fill'
          ? 'bg-surface-brand text-text-weak disabled:bg-surface-brand/32 disabled:cursor-not-allowed'
          : 'border border-border-default bg-surface-weak text-text-secondary disabled:cursor-not-allowed',
        className,
      )}
      onClick={onClickHandler}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
