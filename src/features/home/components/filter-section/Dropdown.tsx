import { useRef, useState } from 'react';
import FilterButton from './FilterButton';
import clsx from 'clsx';
import { useOutsideClick } from '@/hooks/useOutsideClick';

interface DropdownProps<T extends string> {
  filterKey: 'sort' | 'type' | 'status';
  value: T;
  setValue: (value: T) => void;
}

function Dropdown<T extends string>({ filterKey, value, setValue }: DropdownProps<T>) {
  const FILTER_OPTIONS = {
    sort: ['최신순', '오래된순'],
    status: ['전체', '완료', '미완료'],
    type: ['전체', '지문', '상황극'],
  } as const;
  const options = FILTER_OPTIONS[filterKey];

  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, () => setIsOpen(false));

  return (
    <div className="relative">
      <FilterButton filterKey={filterKey} isOpen={isOpen} setIsOpen={setIsOpen} selected={value} />
      {isOpen && (
        <div
          ref={ref}
          className="absolute top-12 w-50 overflow-hidden rounded-xl border border-border-default bg-surface-weak p-2 text-text-secondary shadow-default"
        >
          {options.map((option) => (
            <div
              className={clsx(
                'cursor-pointer rounded-md px-3 py-2',
                option === value ? 'bg-surface-strong' : 'bg-surface-weak',
              )}
              onClick={() => {
                setValue(option as T);
                setIsOpen(false);
              }}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dropdown;
