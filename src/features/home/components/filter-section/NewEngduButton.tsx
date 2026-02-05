import Button from '@/components/Button/Button';
import PlusIcon from '@/assets/icons/plus.svg?react';

interface NewEngduButtonProps {
  onOpenHandler: () => void;
}

function NewEngduButton({ onOpenHandler }: NewEngduButtonProps) {
  return (
    <Button variant="secondary" onClickHandler={onOpenHandler}>
      새 잉듀 만들기
      <PlusIcon />
    </Button>
  );
}

export default NewEngduButton;
