import { cn } from '@/utils/cn';

interface TabItemProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  variant?: 'brand' | 'dark';
  className?: string;
}

export default function TabItem({
  label,
  selected,
  onClick,
  variant = 'brand',
  className,
}: TabItemProps) {
  const selectedStyles = {
    brand: 'bg-surface-brand-default text-text-weak',
    dark: 'bg-surface-inverse text-text-weak',
  };

  const unselectedStyles = {
    brand: 'bg-surface-weak text-text-secondary hover:bg-surface-strong/50',
    dark: 'bg-transparent text-text-secondary hover:bg-surface-strong/30',
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        'flex h-10 w-[135px] cursor-pointer items-center justify-center rounded-lg border-0 font-pretendard text-16 font-medium transition-colors duration-200 outline-none',
        selected ? selectedStyles[variant] : unselectedStyles[variant],
        className,
      )}
    >
      {label}
    </button>
  );
}
