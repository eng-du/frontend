import LockIcon from '@/assets/icons/lock.svg?react';
import StarIcon from '@/assets/icons/star.svg?react';
import LockOpenIcon from '@/assets/icons/lock-open.svg?react';
import clsx from 'clsx';

interface QuizStepIndicatorProps {
  step: number;
  isLocked: boolean;
  isCorrected: boolean;
  isActive: boolean;
  isDesktop?: boolean;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

function QuizStepIndicator({
  step,
  isLocked,
  isCorrected,
  isActive,
  isDesktop = true,
  setStep,
}: QuizStepIndicatorProps) {
  return (
    <div
      className={clsx(
        'flex cursor-pointer flex-col items-center gap-2',
        isCorrected ? 'text-text-accent' : 'text-text-secondary',
      )}
      onClick={() => {
        if (!isLocked) setStep(step);
      }}
    >
      <div
        className={clsx(
          'flex aspect-square items-center justify-center rounded-full border-3',
          isDesktop ? 'w-14' : 'w-11',
          isCorrected
            ? 'border-border-accent bg-surface-accent'
            : 'border-border-default bg-surface-default',
          isActive && 'scale-120 transition-transform duration-200',
        )}
      >
        {isLocked ? (
          <LockIcon className={isDesktop ? 'h-7 w-7' : 'h-5 w-5'} />
        ) : isCorrected ? (
          <StarIcon className={isDesktop ? 'h-7 w-7' : 'h-5 w-5'} />
        ) : (
          <LockOpenIcon className={isDesktop ? 'h-7 w-7' : 'h-5 w-5'} />
        )}
      </div>
      <div className={isDesktop ? 'text-14' : 'text-12'}>QUIZ {step + 1}</div>
    </div>
  );
}

export default QuizStepIndicator;
