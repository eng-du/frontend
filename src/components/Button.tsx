import { cn } from '@/utils/cn';
import type { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  type?: 'primary' | 'secondary';
  style?: 'fill' | 'ghost';
  onClickHandler?: () => void;
}

function Button({ children, type = 'primary', style = 'fill', onClickHandler }: ButtonProps) {
  return (
    <button
      className={cn(
        'flex cursor-pointer items-center',
        type === 'primary'
          ? 'h-14 w-full justify-center gap-2 rounded-2xl px-5'
          : 'h-10.5 w-40 justify-between rounded-xl px-5',
        style === 'fill'
          ? 'bg-surface-brand text-text-weak'
          : 'border border-border-default bg-surface-weak text-text-secondary',
      )}
      onClick={onClickHandler}
    >
      {children}
    </button>
  );
}

export default Button;
