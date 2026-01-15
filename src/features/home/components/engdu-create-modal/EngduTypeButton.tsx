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
      className={cn(selected && 'border-border-accent bg-surface-accent text-text-accent')}
    >
      {selected ? <RadioSelectedIcon className="h-5 w-5" /> : <RadioIcon className="h-5 w-5" />}
      <div className="text-22 font-semibold">{value}</div>
    </Button>
  );
}

export default EngduTypeButton;
