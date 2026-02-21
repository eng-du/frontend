import { cn } from '@/utils/cn';
import type { ReactNode } from 'react';

interface LandingSectionProps {
  title: string;
  description: string;
  media: ReactNode;
  order?: 'default' | 'reverse';
}

function LandingSection({ title, description, media, order = 'default' }: LandingSectionProps) {
  return (
    <div
      className={cn(
        'flex w-full flex-col items-center justify-between gap-10 bg-surface-weak px-[12.5%] py-20 lg:flex-row lg:py-30',
        order === 'reverse' && 'bg-surface-brand-weak/30 lg:flex-row-reverse',
      )}
    >
      <div className="flex flex-col gap-4">
        <h1 className="text-center text-24 font-bold whitespace-pre-line lg:text-left lg:text-36">
          {title}
        </h1>
        <p className="text-center whitespace-pre-line text-text-secondary lg:text-left">
          {description}
        </p>
      </div>
      <div className="w-full max-w-140">{media}</div>
    </div>
  );
}

export default LandingSection;
