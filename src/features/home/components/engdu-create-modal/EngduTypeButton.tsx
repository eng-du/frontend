import { cn } from '@/utils/cn';
import RadioIcon from '@/assets/icons/circle.svg?react';
import RadioSelectedIcon from '@/assets/icons/circle-dot.svg?react';
import Button from '@/components/Button';
import type { EngduType } from '@/types/engdu';

interface EngduTypeButtonProps {
  value: '지문' | '상황극';
  selected: boolean;
  onSelectHandler: (value: EngduType) => void;
}

function EngduTypeButton({ value, selected, onSelectHandler }: EngduTypeButtonProps) {
  return (
    <Button
      type="primary"
      style="ghost"
      onClickHandler={() => onSelectHandler(value)}
      className={cn(
        'relative overflow-hidden',
        selected && 'border-border-accent bg-surface-accent text-text-accent',
        value === '상황극' && 'cursor-not-allowed border-dashed bg-surface-weak',
      )}
      disabled={value === '상황극'}
    >
      {selected ? <RadioSelectedIcon className="h-5 w-5" /> : <RadioIcon className="h-5 w-5" />}
      {value === '상황극' && (
        <span className="shadow-sm absolute top-2 -right-6 rotate-45 border border-border-danger bg-surface-danger px-8 py-1 text-12 font-bold text-text-danger">
          준비 중!
        </span>
      )}
      <div className="text-22 font-semibold">{value}</div>
    </Button>
  );
}

export default EngduTypeButton;
