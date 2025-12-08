import clsx from 'clsx';
import type { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  type?: 'primary' | 'secondary';
  style?: 'fill' | 'ghost';
}

function Button({ children, type = 'primary', style = 'fill' }: ButtonProps) {
  return (
    <button
      className={clsx(
        'flex cursor-pointer items-center',
        type === 'primary'
          ? 'h-14 w-full justify-center gap-2 rounded-2xl'
          : 'h-10.5 w-40 justify-between rounded-xl px-5',
        style === 'fill'
          ? 'bg-surface-brand text-text-weak'
          : 'border border-border-default bg-surface-default text-text-secondary',
      )}
    >
      {children}
    </button>
  );
}

export default Button;
