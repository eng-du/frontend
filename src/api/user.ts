import api from './api';

export type MeResponse = {
  name: string;
};

export async function getMe() {
  const res = await api.get<MeResponse>('/user/me');
  return res.data;
}
