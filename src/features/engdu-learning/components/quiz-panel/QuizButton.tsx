import Button from '@/components/Button/Button';
import RetryIcon from '@/assets/icons/rotate-ccw.svg?react';
import NextIcon from '@/assets/icons/arrow-right.svg?react';

interface QuizButtonProps {
  onClickHandler: () => void;
  disabled?: boolean;
}

export function QuizSubmitButton({ onClickHandler, disabled }: QuizButtonProps) {
  return (
    <Button onClickHandler={onClickHandler} disabled={disabled}>
      제출하기
    </Button>
  );
}

export function QuizRetryButton({ onClickHandler }: QuizButtonProps) {
  return (
    <Button appearance="ghost" onClickHandler={onClickHandler}>
      <RetryIcon className="h-4 w-4" />
      다시 시도하기
    </Button>
  );
}

export function QuizNextButton({ onClickHandler }: QuizButtonProps) {
  return (
    <Button appearance="ghost" onClickHandler={onClickHandler}>
      다음으로
      <NextIcon className="h-4 w-4" />
    </Button>
  );
}

export function QuizFinishButton({ onClickHandler }: QuizButtonProps) {
  return (
    <Button appearance="ghost" onClickHandler={onClickHandler}>
      종료하기
    </Button>
  );
}
