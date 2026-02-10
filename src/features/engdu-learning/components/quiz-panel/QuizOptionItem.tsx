import RadioIcon from '@/assets/icons/circle.svg?react';
import RadioSelectedIcon from '@/assets/icons/circle-dot.svg?react';
import RadioIncorrectIcon from '@/assets/icons/circle-x.svg?react';
import RadioCorrectIcon from '@/assets/icons/circle-check-big.svg?react';
import { cn } from '@/utils/cn';
import type { EngduChoice } from '@/types/quiz';

interface QuizOptionItemProps {
  option: EngduChoice;
  isSelected: boolean;
}

interface QuizOptionIdleItemProps extends QuizOptionItemProps {
  onClickHandler: () => void;
}

const baseStyle =
  'flex px-5 py-2.5 w-full items-center gap-2 rounded-2xl border border-surface-weak transition-all duration-100 cursor-pointer';

export function QuizOptionIdleItem({
  option,
  isSelected,
  onClickHandler,
}: QuizOptionIdleItemProps) {
  return (
    <li
      className={cn(
        baseStyle,
        'hover:scale-101',
        isSelected
          ? 'border-text-brand-primary bg-surface-brand-default/8 text-text-brand-primary'
          : 'hover:bg-surface-default',
      )}
      onClick={onClickHandler}
    >
      {isSelected ? (
        <RadioSelectedIcon className="h-4 w-4" />
      ) : (
        <RadioIcon className="h-4 w-4 text-border-default" />
      )}
      {option.content}
    </li>
  );
}

export function QuizOptionIncorrectItem({ option, isSelected }: QuizOptionItemProps) {
  return (
    <li
      className={cn(
        baseStyle,
        isSelected && 'border-text-danger bg-surface-danger text-text-danger',
      )}
    >
      {isSelected ? (
        <RadioIncorrectIcon className="h-4 w-4" />
      ) : (
        <RadioIcon className="h-4 w-4 text-border-default" />
      )}
      {option.content}
    </li>
  );
}

export function QuizOptionCorrectItem({ option, isSelected }: QuizOptionItemProps) {
  return (
    <li
      className={cn(
        baseStyle,
        isSelected && 'border-text-positive bg-surface-positive text-text-positive',
      )}
    >
      {isSelected ? (
        <RadioCorrectIcon className="h-4 w-4" />
      ) : (
        <RadioIcon className="h-4 w-4 text-border-default" />
      )}
      {option.content}
    </li>
  );
}
