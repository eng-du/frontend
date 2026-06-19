import type { ReactNode } from 'react';
import BottomNavigationBar, {
  type TabType,
} from './components/BottomNavigationBar/BottomNavigationBar';
import { cn } from '@/utils/cn';
import { useAuth } from '@/hooks/useAuth';
import { useLocation } from 'react-router';

export interface MobileLayoutProps {
  children: ReactNode;
  activeTab: TabType;
  onChangeTab: (tab: TabType) => void;
  className?: string;
  contentClassName?: string;
}

export default function MobileLayout({
  children,
  activeTab,
  onChangeTab,
  className,
  contentClassName,
}: MobileLayoutProps) {
  const { user } = useAuth();
  const { pathname } = useLocation();

  const isGuestHomeOrLogin = !user && (pathname === '/' || pathname.startsWith('/login'));
  const isGuestPolicy = !user && pathname.startsWith('/policy');

  return (
    <div
      className={cn(
        'flex h-dvh w-full flex-col overflow-hidden border-x border-border-default bg-surface-default shadow-default',
        className,
      )}
    >
      {/* 내부 스크롤 가능한 메인 콘텐츠 영역 */}
      <main
        className={cn(
          'scrollbar-none flex-1 overflow-y-auto',
          !isGuestHomeOrLogin && 'px-5 pt-8',
          !isGuestHomeOrLogin && (isGuestPolicy ? 'pb-8' : 'pb-21'),
          contentClassName,
        )}
      >
        {children}
      </main>

      {/* 하단 고정 네비게이션 바 */}
      {!isGuestHomeOrLogin && !isGuestPolicy && (
        <BottomNavigationBar activeTab={activeTab} onChangeTab={onChangeTab} />
      )}
    </div>
  );
}
