import { ReactNode } from 'react';
import { cn } from '@/utils/cn';

/** 우측 화살표 아이콘 (Chevron Right) */
function ChevronRightIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.5 15L12.5 10L7.5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export interface MenuGroupProps {
  children: ReactNode;
  className?: string;
}

/** 여러 개의 MenuButton을 감쌀 때 사용하는 컨테이너 */
export function MenuGroup({ children, className }: MenuGroupProps) {
  return (
    <div
      className={cn(
        'flex w-full flex-col overflow-hidden rounded-2xl bg-surface-weak shadow-default',
        className,
      )}
    >
      {/* 그룹 내 아이템들을 구분선 등으로 렌더링하기 용이하도록 기본 flex 구성 */}
      {children}
    </div>
  );
}

export interface MenuButtonProps {
  /** 좌측에 표시할 아이콘 (옵션) */
  icon?: ReactNode;
  /** 메뉴 텍스트 (필수) */
  label: string;
  /** 우측 링크(화살표) 표시 여부 (기본값: true) */
  hasArrow?: boolean;
  /** 단일 버튼으로 사용될 때 true 설정 (둥근 모서리와 그림자 부여) */
  isSingle?: boolean;
  /** 클릭 핸들러 */
  onClick?: () => void;
  className?: string;
}

/**
 * 리스트 형태의 메뉴 버튼
 * - 단일(isSingle)일 경우 자체적인 컨테이너 스타일(라운드, 그림자)을 가집니다.
 * - 그룹일 경우 MenuGroup 하위에 배치하여 사용합니다.
 */
export function MenuButton({
  icon,
  label,
  hasArrow = true,
  isSingle = false,
  onClick,
  className,
}: MenuButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex h-[60px] w-full shrink-0 items-center justify-between bg-surface-weak px-5 transition-colors',
        // 클릭/터치 시 부드러운 피드백 (hover 등)
        'active:bg-surface-default/50 sm:hover:bg-surface-default/50',
        // 단일 모드일 때만 라운드와 그림자 적용
        isSingle && 'rounded-2xl shadow-default',
        className,
      )}
    >
      <div className="flex items-center gap-3">
        {icon && (
          <div className="flex h-5 w-5 shrink-0 items-center justify-center text-text-primary">
            {icon}
          </div>
        )}
        <span className="font-pretendard text-16 font-medium text-text-primary">{label}</span>
      </div>

      {hasArrow && (
        <div className="flex h-5 w-5 shrink-0 items-center justify-center text-text-primary">
          <ChevronRightIcon />
        </div>
      )}
    </button>
  );
}
