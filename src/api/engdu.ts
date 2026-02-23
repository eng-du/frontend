import type {
  DetailEngdu,
  EngduMeta,
  EngduPart,
  EngduSummary,
  SortOption,
  StatusOption,
  TypeOption,
  PhrasalVerb,
  LikeStatus,
} from '@/types/engdu';
import api from './api';

export async function getRandomPhrasalVerb(excludeIds: number[]): Promise<PhrasalVerb> {
  const res = await api.get('/phrasal-verb', {
    params: { excludeIds },
    paramsSerializer: {
      indexes: null,
    },
  });
  return res.data;
}

interface GetEngdusProps {
  page?: number;
  sort?: SortOption;
  type?: TypeOption;
  status?: StatusOption;
}

interface GetEngdusResponse {
  content: EngduSummary[];
  totalPages: number;
  hasEngdu: boolean;
}

export async function getEngdus({
  page = 1,
  sort = '최신순',
  status = '전체',
}: GetEngdusProps): Promise<GetEngdusResponse> {
  const direction = sort === '최신순' ? 'DESC' : 'ASC';
  const isSolved = status === '완료' ? 'TRUE' : status === '미완료' ? 'FALSE' : 'ALL';
  // TODO: 현재는 지문 타입만 존재, 추후 type 연동

  const res = await api.get('/engdu', {
    params: { page, direction, isSolved },
  });
  return res.data;
}

export async function getEngduDetail(engduId: number) {
  const res = await api.get<DetailEngdu>(`/engdu/${engduId}`);
  return res.data;
}

export interface EngduPartResponse {
  engduId: number;
  meta: EngduMeta;
  part: EngduPart;
}

export async function postEngduPart1(engduId: number) {
  const res = await api.post<EngduPartResponse>(
    `/engdu/${engduId}/part`,
    { step: 'INITIAL' },
    { timeout: 300_000 },
  );
  return res.data;
}

export async function postEngduPart2(engduId: number) {
  const res = await api.post<EngduPartResponse>(
    `/engdu/${engduId}/part`,
    { step: 'COMPLETE' },
    { timeout: 300_000 },
  );
  return res.data;
}

interface CreateEngduProps {
  topic: string;
  level: string;
}

interface CreateEngduResponse {
  engduId: number;
}

export async function postEngdu(data: CreateEngduProps): Promise<CreateEngduResponse> {
  const res = await api.post('/engdu', data);
  return res.data;
}

export async function postEngduLike(engduId: number, likeStatus: LikeStatus) {
  const res = await api.post(`/engdu/${engduId}/like`, { likeStatus });
  return res.data;
}
