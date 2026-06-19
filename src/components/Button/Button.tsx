import { cn } from '@/utils/cn';
import type { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  appearance?: 'fill' | 'ghost';
  device?: 'desktop' | 'tablet' | 'mobile';
  onClickHandler?: () => void;
  disabled?: boolean;
  className?: string;
}

function Button({
  children,
  variant = 'primary',
  appearance = 'fill',
  device = 'desktop',
  onClickHandler,
  disabled = false,
  className,
}: ButtonProps) {
  return (
    <button
      className={cn(
        'flex cursor-pointer items-center px-5 py-3 transition-colors duration-150',
        variant === 'primary'
          ? cn(
            'w-full justify-center gap-2.5 rounded-2xl',
            device === 'mobile' ? 'h-13 text-14' : 'h-14 text-16',
          )
          : cn(
            'justify-between rounded-xl px-5',
            device === 'mobile' ? 'h-10.5 w-35 text-14' : 'h-10.5 w-40 text-16',
          ),
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
