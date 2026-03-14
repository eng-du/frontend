import { cn } from '@/utils/cn';

interface TabItemProps {
  name: string;
  selected: boolean;
  onClick: () => void;
}
function TabItem({ name, selected, onClick }: TabItemProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'flex w-full cursor-pointer items-center justify-center rounded-md text-14 transition-colors',
        selected && 'bg-surface-inverse text-text-weak',
      )}
    >
      {name}
    </div>
  );
}

export default TabItem;
