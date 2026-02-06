import Button from '@/components/Button/Button';
import DownIcon from '@/assets/icons/chevron-down.svg?react';
import clsx from 'clsx';

interface FilterButtonProps<T> {
  filterKey: 'sort' | 'type' | 'status';
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selected: T;
}

function FilterButton<T extends string>({
  filterKey,
  isOpen,
  setIsOpen,
  selected,
}: FilterButtonProps<T>) {
  return (
    <Button variant="secondary" appearance="ghost" onClickHandler={() => setIsOpen((prev) => !prev)}>
      {(function () {
        switch (filterKey) {
          case 'sort':
            return '정렬';
          case 'type':
            return '종류';
          case 'status':
            return '상태';
        }
      })()}
      : {selected}
      <DownIcon className={clsx(isOpen && 'rotate-180')} />
    </Button>
  );
}

export default FilterButton;
