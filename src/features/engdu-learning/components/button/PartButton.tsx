import { cn } from '@/utils/cn';

interface PartButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean;
  label: string;
}

function PartButton({ isActive, label, className, ...props }: PartButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        'text-18 rounded-full px-6 py-2.5 font-bold transition-colors',
        isActive ? 'bg-surface-brand-default text-white' : 'bg-surface-weak text-text-secondary',
        props.disabled && 'cursor-not-allowed opacity-50',
        className,
      )}
    >
      {label}
    </button>
  );
}

export default PartButton;
