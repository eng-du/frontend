import Button from '@/components/Button/Button';
import PlusIcon from '@/assets/icons/plus.svg?react';

interface NewEngduButtonProps {
  onOpenHandler: () => void;
}

function NewEngduButton({ onOpenHandler }: NewEngduButtonProps) {
  return (
    <Button
      variant="secondary"
      onClickHandler={onOpenHandler}
      className="shadow-2xl fixed right-5 bottom-10 z-20 h-16 w-16 rounded-full md:relative md:right-auto md:bottom-auto md:h-10.5 md:w-40 md:rounded-xl md:shadow-none"
    >
      <span className="hidden md:inline">새 잉듀 만들기</span>
      <PlusIcon />
    </Button>
  );
}

export default NewEngduButton;
