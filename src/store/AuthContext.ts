import { createContext } from 'react';
import { type MeResponse } from '@/api/user';

type AuthState = {
  user: MeResponse | null;
  loading: boolean;
  isAuthenticated: boolean;
  refreshMe: () => Promise<MeResponse>;
  clearAuth: () => void;
};

export const AuthContext = createContext<AuthState | null>(null);
