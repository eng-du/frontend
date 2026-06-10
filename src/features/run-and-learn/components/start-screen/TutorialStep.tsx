import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';
import StepBadge from './StepBadge';

interface TutorialStepProps {
  step: number;
  text?: string;
  children?: ReactNode;
  className?: string;
}

function TutorialStep({ step, text, children, className }: TutorialStepProps) {
  return (
    <div className={cn('flex gap-3 items-start', className)}>
      <StepBadge step={step} />
      <div className="font-medium text-20 text-text-secondary">
        {text && <p className="m-0">{text}</p>}
        {children && <ul className="mt-1 list-disc pl-6">{children}</ul>}
      </div>
    </div>
  );
}

export default TutorialStep;
