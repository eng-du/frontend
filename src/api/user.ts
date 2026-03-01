import api from './api';

export type MeResponse = {
  userId: number;
  name: string;
};

export type MeDetailResponse = {
  email: string;
  name: string;
};

export async function getMe() {
  const res = await api.get<MeResponse>('/user/me');
  return res.data;
}

export async function getMeDetail() {
  const res = await api.get<MeDetailResponse>('/user/me/detail');
  return res.data;
}

export async function patchName(name: string) {
  await api.patch('/user/name', { name });
}

export async function deleteWithdraw() {
  await api.delete('/user/withdrawal');
}
