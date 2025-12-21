import { cn } from '@/utils/cn';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-start gap-5 rounded-2xl bg-surface-weak p-7 shadow-default',
        className,
      )}
    >
      {children}
    </div>
  );
}

export default Card;
