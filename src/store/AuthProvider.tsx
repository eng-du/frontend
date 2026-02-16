import { getMe, type MeResponse } from '@/api/user';
import { useCallback, useEffect, useMemo, useState } from 'react';
import authTokenStore from './authToken';
import { AuthContext } from './AuthContext';
import { useLocation } from 'react-router';
import { setUserId } from '@/utils/analytics';

type AuthProviderProps = { children: React.ReactNode };

export function AuthProvider({ children }: AuthProviderProps) {
  const { pathname } = useLocation();

  const [user, setUser] = useState<MeResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isExcluded = pathname.startsWith('/login') || pathname.startsWith('/oauth/callback');

    if (isExcluded) {
      setLoading(false);
      return;
    }

    (async () => {
      try {
        const me = await getMe();
        setUser(me);
        setUserId(me.userId);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refreshMe = useCallback(async () => {
    setLoading(true);
    try {
      const me = await getMe();
      setUser(me);
      setUserId(me.userId);
      return me;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearAuth = useCallback(() => {
    authTokenStore.clear();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated: !!user && !loading,
      refreshMe,
      clearAuth,
    }),
    [user, loading, refreshMe, clearAuth],
  );

  return <AuthContext value={value}>{children}</AuthContext>;
}
