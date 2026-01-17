import { cn } from '@/utils/cn';

interface PaginationItemProps {
  page: number;
  active?: boolean;
  onChangePage: (page: number) => void
}

function PaginationItem({ page, active = false, onChangePage }: PaginationItemProps) {
  return (
    <button
      className={cn(
        'flex h-12 w-12 items-center justify-center rounded-xl',
        active ? 'bg-surface-brand text-text-weak' : 'border border-border-default bg-surface-weak',
      )}
      onClick={() => onChangePage(page)}
    >
      {page}
    </button>
  );
}

export default PaginationItem;
