import { cn } from '@/utils/cn';
import type { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  appearance?: 'fill' | 'ghost';
  onClickHandler?: () => void;
  disabled?: boolean;
  className?: string;
}

function Button({
  children,
  variant = 'primary',
  appearance = 'fill',
  onClickHandler,
  disabled = false,
  className,
}: ButtonProps) {
  return (
    <button
      className={cn(
        'flex cursor-pointer items-center',
        variant === 'primary'
          ? 'h-12 w-full justify-center gap-2 rounded-xl px-5 text-14 xl:h-14 xl:rounded-2xl xl:text-16'
          : 'h-10.5 w-40 justify-between rounded-xl px-5',
        appearance === 'fill'
          ? 'bg-surface-brand-default text-text-weak disabled:cursor-not-allowed disabled:bg-surface-brand-default/32'
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
