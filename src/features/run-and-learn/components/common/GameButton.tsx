import { type ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface GameButtonProps {
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
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
        'flex items-center justify-center shrink-0 pb-1 border-solid',
        
        // 반응형 버튼 크기 및 테두리 반경 설정
        size === 'lg' && 'w-[140px] h-[46px] rounded-[100px] md:w-[259px] md:h-[69px] md:rounded-full',
        size === 'md' && 'w-[140px] h-[46px] rounded-[100px] md:w-[259px] md:h-[69px] md:rounded-full',
        size === 'sm' && 'w-[140px] h-[46px] rounded-[100px] md:w-[180px] md:h-[54px] md:rounded-full',
        
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
          
          // 반응형 텍스트 크기 설정
          size === 'lg' && 'text-24 md:text-[40px]',
          size === 'md' && 'text-24 md:text-32',
          size === 'sm' && 'text-[20px] md:text-[24px]'
        )}
      >
        {children}
      </span>
    </button>
  );
}
