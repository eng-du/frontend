import { createContext } from 'react';
import { type MeResponse } from '@/api/user';

type AuthState = {
  user: MeResponse | null;
  isPending: boolean;
  refreshMe: () => void;
  clearAuth: () => void;
};

export const AuthContext = createContext<AuthState | null>(null);
