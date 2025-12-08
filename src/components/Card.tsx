import clsx from 'clsx';
import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  calssName?: string;
}

function Card({ children, calssName }: CardProps) {
  return (
    <div
      className={clsx(
        'flex flex-col items-start gap-5 rounded-2xl bg-surface-weak p-7 shadow-default',
        calssName,
      )}
    >
      {children}
    </div>
  );
}

export default Card;
