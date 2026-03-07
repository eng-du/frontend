import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo } from 'react';
import { getMe, type MeResponse } from '@/api/user';
import authTokenStore from './authToken';
import { AuthContext } from './AuthContext';
import { useLocation } from 'react-router';
import { setUserId } from '@/utils/analytics';

type AuthProviderProps = { children: React.ReactNode };

export function AuthProvider({ children }: AuthProviderProps) {
  const { pathname } = useLocation();
  const queryClient = useQueryClient();

  const isExcluded = pathname.startsWith('/login') || pathname.startsWith('/oauth/callback') || pathname.startsWith('/policy');

  const { data: user = null, isPending } = useQuery<MeResponse | null>({
    queryKey: ['user', 'me'],
    queryFn: getMe,
    enabled: !isExcluded,
    retry: false,
  });

  useEffect(() => {
    if (user) {
      setUserId(user.userId);
    }
  }, [user]);

  const refreshMe = useCallback(() => {
    queryClient.invalidateQueries({ queryKey: ['user', 'me'] });
  }, []);

  const clearAuth = useCallback(() => {
    authTokenStore.clear();
    queryClient.setQueryData(['user', 'me'], null)
  }, []);

  const value = useMemo(
    () => ({
      user,
      isPending,
      refreshMe,
      clearAuth,
    }),
    [user, isPending, refreshMe, clearAuth],
  );

  return <AuthContext value={value}>{children}</AuthContext>;
}
