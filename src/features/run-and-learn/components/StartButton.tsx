import { cn } from '@/utils/cn';

interface StartButtonProps {
  onStart: () => void;
  isLoading?: boolean;
}

export default function StartButton({ onStart, isLoading = false }: StartButtonProps) {
  return (
    <button
      onClick={isLoading ? undefined : onStart}
      disabled={isLoading}
      className={cn(
        'flex items-center justify-center shrink-0',
        'h-[69px] w-[259px] px-[49px] overflow-hidden rounded-full',
        'border-b-4 border-[#314778]',
        'transition-[filter,transform] duration-150 ease-in-out',
        isLoading
          ? 'bg-[#6b8fd6] cursor-not-allowed'
          : 'bg-surface-brand-default cursor-pointer hover:brightness-110 active:scale-[0.96]',
      )}
    >
      <span className="shrink-0 whitespace-nowrap text-center not-italic leading-normal text-text-weak font-pinkfong font-normal text-[40px]">
        {isLoading ? '로딩 중...' : 'START!'}
      </span>
    </button>
  );
}
