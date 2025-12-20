import Button from '@/components/Button';
import PlusIcon from '@/assets/icons/plus.svg?react';

function NewEngduButton() {
  return (
    <Button type="secondary">
      새 잉듀 만들기
      <PlusIcon />
    </Button>
  );
}

export default NewEngduButton;
