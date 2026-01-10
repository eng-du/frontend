import { getMe, type MeResponse } from '@/api/user';
import { useCallback, useEffect, useMemo, useState } from 'react';
import authTokenStore from './authToken';
import { AuthContext } from './AuthContext';

type AuthProviderProps = { children: React.ReactNode };

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<MeResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const me = await getMe();
        setUser(me);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const refreshMe = useCallback(async () => {
    setLoading(true);
    try {
      const me = await getMe();
      setUser(me);
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
