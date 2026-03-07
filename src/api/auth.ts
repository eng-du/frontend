import api from './api';

export interface GoogleLoginResponse {
  accessToken: string;
}

export async function googleLogin(code: string): Promise<GoogleLoginResponse> {
  const res = await api.get<GoogleLoginResponse>(import.meta.env.DEV ? '/auth/local/signup/oauth' : '/auth/signup/oauth', {
    params: { code },
  });

  return res.data;
}

export function logout() {
  return api.post('/auth/logout');
}
