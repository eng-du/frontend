import { Outlet, useLocation, useNavigate } from 'react-router';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { useAuth } from './hooks/useAuth';
import Splash from './components/Splash/Splash';
import { useEffect, useState, useRef } from 'react';
import { useDeviceType } from './hooks/useMediaQuery';
import MobileLayout from './MobileLayout';
import type { TabType } from './components/BottomNavigationBar/BottomNavigationBar';
import { cn } from './utils/cn';

const DELAY_THRESHOLD = 300;
const MIN_DURATION = 500;

export default function Layout() {
  const { pathname, search } = useLocation();
  const navigate = useNavigate();
  const deviceType = useDeviceType();
  const isMobile = deviceType === 'mobile';

  const { isPending } = useAuth();
  const [showSplash, setShowSplash] = useState(false);

  const isSplashVisible = useRef(false);
  const shownAtRef = useRef<number | null>(null);

  const delayTimerRef = useRef<number | null>(null);
  const hideTimerRef = useRef<number | null>(null);

  useEffect(() => {
    const clearAllTimers = () => {
      if (delayTimerRef.current !== null) {
        window.clearTimeout(delayTimerRef.current);
        delayTimerRef.current = null;
      }
      if (hideTimerRef.current !== null) {
        window.clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }
    };

    clearAllTimers();

    if (isPending) {
      delayTimerRef.current = window.setTimeout(() => {
        shownAtRef.current = Date.now();
        isSplashVisible.current = true;
        setShowSplash(true);
      }, DELAY_THRESHOLD);
    } else {
      if (!isSplashVisible.current) {
        setShowSplash(false);
        shownAtRef.current = null;
      } else {
        const elapsed = Date.now() - (shownAtRef.current ?? 0);
        const remaining = MIN_DURATION - elapsed;

        if (remaining > 0) {
          hideTimerRef.current = window.setTimeout(() => {
            isSplashVisible.current = false;
            setShowSplash(false);
            shownAtRef.current = null;
          }, remaining);
        } else {
          isSplashVisible.current = false;
          setShowSplash(false);
          shownAtRef.current = null;
        }
      }
    }

    return clearAllTimers;
  }, [isPending]);

  const getActiveTab = (path: string, searchStr: string): TabType => {
    if (path.startsWith('/run-and-learn')) {
      const params = new URLSearchParams(searchStr);
      return params.get('tab') === 'ranking' ? 'ranking' : 'run-and-learn';
    }
    if (path.startsWith('/mypage') || path.startsWith('/policy')) return 'mypage';
    if (path.startsWith('/ranking')) return 'ranking';
    return 'home';
  };

  const activeTab = getActiveTab(pathname, search);

  const handleTabChange = (tab: TabType) => {
    switch (tab) {
      case 'home':
        navigate('/');
        break;
      case 'run-and-learn':
        navigate('/run-and-learn');
        break;
      case 'ranking':
        navigate('/run-and-learn?tab=ranking');
        break;
      case 'mypage':
        navigate('/mypage');
        break;
    }
  };

  if (showSplash || isPending) {
    return <Splash />;
  }

  const isLearningPage = pathname.startsWith('/learning');

  // 모바일 뷰포트일 때는 모바일 전용 레이아웃 반환
  if (isMobile) {
    return (
      <MobileLayout
        activeTab={activeTab}
        onChangeTab={handleTabChange}
        contentClassName={cn(isLearningPage && 'px-0 pt-0 pb-21 bg-surface-weak')}
      >
        <Outlet />
      </MobileLayout>
    );
  }

  // 태블릿 및 데스크톱 뷰포트일 때의 기본 레이아웃 반환
  return (
    <div>
      <Header />
      <main className="min-h-dvh pt-15">
        <Outlet />
      </main>
      {!isLearningPage && <Footer />}
    </div>
  );
}
