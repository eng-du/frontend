import { cn } from '@/utils/cn';
import type { ReactNode } from 'react';

interface TabProps {
  children: ReactNode;
  className?: string;
}

export default function Tab({ children, className }: TabProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-between gap-2.5 rounded-2xl border border-border-default bg-surface-weak p-2 shadow-default',
        className,
      )}
    >
      {children}
    </div>
  );
}
