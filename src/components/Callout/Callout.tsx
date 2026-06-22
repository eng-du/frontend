import type { ComponentType, ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface EngduCalloutProps {
  children: ReactNode;
  Icon: ComponentType<{ className?: string }>;
  onClickHandler?: () => void;
  className?: string;
}

function Callout({ children, Icon, onClickHandler, className }: EngduCalloutProps) {
  return (
    <div
      className={cn('flex flex-col items-center gap-4', className)}
      onClick={onClickHandler}
    >
      <div
        className={cn(
          'relative rounded-2xl bg-surface-weak p-4 text-center whitespace-nowrap drop-shadow-default',
          "after:absolute after:bottom-0 after:left-1/2 after:aspect-square after:w-3 after:-translate-x-1/2 after:translate-y-full after:bg-surface-weak after:content-[''] after:[clip-path:polygon(50%_100%,0_0,100%_0)]",
        )}
      >
        {children}
      </div>

      {Icon && <Icon className="h-auto w-32 sm:w-40" />}
    </div>
  );
}

export default Callout;
