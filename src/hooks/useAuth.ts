import { useContext } from 'react';
import { AuthContext } from '@/store/AuthContext';

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth는 반드시 AuthProvider 내에서 사용되어야합니다.');
  return ctx;
}
