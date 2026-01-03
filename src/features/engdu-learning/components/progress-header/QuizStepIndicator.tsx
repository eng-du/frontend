import LockIcon from '@/assets/icons/lock.svg?react';
import StarIcon from '@/assets/icons/star.svg?react';
import clsx from 'clsx';

interface QuizStepIndicatorProps {
  step: number;
  isLocked: boolean;
  isActive: boolean;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

function QuizStepIndicator({ step, isLocked, isActive, setStep }: QuizStepIndicatorProps) {
  return (
    <div
      className={clsx(
        'flex cursor-pointer flex-col items-center gap-2',
        isLocked ? 'text-text-secondary' : 'text-text-accent',
      )}
      onClick={() => {
        if (!isLocked) setStep(step);
      }}
    >
      <div
        className={clsx(
          'flex aspect-square w-13 items-center justify-center rounded-full border-3',
          isLocked
            ? 'border-border-default bg-surface-default'
            : 'border-border-accent bg-surface-accent',
          isActive && 'scale-120 transition-transform duration-200',
        )}
      >
        {isLocked ? <LockIcon className="h-5 w-5" /> : <StarIcon className="h-6 w-6" />}
      </div>
      <div>QUIZ {step + 1}</div>
    </div>
  );
}

export default QuizStepIndicator;
