import { type ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface GameButtonProps {
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  variant?: 'primary' | 'secondary';
  size?: 'md' | 'lg';
  className?: string;
  children: ReactNode;
}

/** 🎮 런앤런 게임 내에서 사용되는 통일된 디자인의 입체형 라운드 버튼 */
export default function GameButton({
  onClick,
  disabled = false,
  isLoading = false,
  variant = 'primary',
  size = 'md',
  className,
  children,
}: GameButtonProps) {
  const isPrimary = variant === 'primary';

  return (
    <button
      onClick={disabled || isLoading ? undefined : onClick}
      disabled={disabled || isLoading}
      className={cn(
        'flex items-center justify-center shrink-0 pb-1',
        'w-[259px] h-[69px] rounded-full border-solid',
        isPrimary
          ? 'bg-surface-brand-default border-[#314778] border-b-4 shadow-md shadow-blue-600/20'
          : 'bg-surface-weak border-border-default border-b-4 shadow-sm',
        'transition-all duration-150 ease-in-out select-none',
        disabled || isLoading
          ? 'opacity-70 cursor-not-allowed'
          : 'cursor-pointer hover:brightness-105 active:scale-[0.96]',
        className
      )}
    >
      <span
        className={cn(
          'font-pinkfong font-bold text-center leading-none whitespace-nowrap shrink-0',
          isPrimary ? 'text-text-weak' : 'text-text-primary',
          size === 'lg' ? 'text-[40px]' : 'text-32'
        )}
      >
        {children}
      </span>
    </button>
  );
}
