import Button from '@/components/Button/Button';
import RetryIcon from '@/assets/icons/rotate-ccw.svg?react';
import NextIcon from '@/assets/icons/arrow-right.svg?react';

interface QuizButtonProps {
  onClickHandler: () => void;
  disabled?: boolean;
  isMobile?: boolean;
}

export function QuizSubmitButton({ onClickHandler, disabled, isMobile }: QuizButtonProps) {
  return (
    <Button
      onClickHandler={onClickHandler}
      disabled={disabled}
      device={isMobile ? 'mobile' : 'desktop'}
    >
      제출하기
    </Button>
  );
}

export function QuizRetryButton({ onClickHandler, isMobile }: QuizButtonProps) {
  return (
    <Button
      appearance="ghost"
      onClickHandler={onClickHandler}
      device={isMobile ? 'mobile' : 'desktop'}
    >
      <RetryIcon className="h-4 w-4" />
      다시 시도하기
    </Button>
  );
}

export function QuizNextButton({ onClickHandler, isMobile }: QuizButtonProps) {
  return (
    <Button
      appearance="ghost"
      onClickHandler={onClickHandler}
      device={isMobile ? 'mobile' : 'desktop'}
    >
      다음으로
      <NextIcon className="h-4 w-4" />
    </Button>
  );
}

export function QuizFinishButton({ onClickHandler, isMobile }: QuizButtonProps) {
  return (
    <Button
      appearance="ghost"
      onClickHandler={onClickHandler}
      device={isMobile ? 'mobile' : 'desktop'}
    >
      종료하기
    </Button>
  );
}
