import { Outlet, useLocation } from 'react-router';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import { useAuth } from './hooks/useAuth';
import Splash from './components/Splash/Splash';
import { useEffect, useState, useRef } from 'react';

const DELAY_THRESHOLD = 300;
const MIN_DURATION = 500;

export default function Layout() {
  const { pathname } = useLocation();
  const isLearningPage = pathname.startsWith('/learning');

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

  return (
    <div>
      <Header />
      <main className="min-h-dvh pt-15">{showSplash ? <Splash /> : !isPending && <Outlet />}</main>
      {!isLearningPage && <Footer />}
    </div>
  );
}
