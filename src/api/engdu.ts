import type {
  EngduSummary,
  SortOption,
  StatusOption,
  TypeOption,
  LikeStatus,
  EngduPartType,
  EngduPartStatus,
  EngduPartData,
  EngduMeta,
  EngduPart,
} from '@/types/engdu';
import api from './api';

/** 잉듀 목록 조회하기 */
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


/** 비어있는 잉듀 생성하기 */
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


/** 잉듀 상세 조회하기 */
export interface EngduDetailResponse {
  engduId: number;
  meta: EngduMeta | null;
  parts: Record<EngduPartType, EngduPart | null>;
}

export async function getEngduDetail(engduId: number) {
  const res = await api.get<EngduDetailResponse>(`/engdu/${engduId}`);
  return res.data;
}


/** 잉듀 파트 생성하기 */
export async function postEngduPart(engduId: number, partType: EngduPartType) {
  const res = await api.post(`/engdu/${engduId}/part/${partType}`);
  return res.data;
}


/** 잉듀 파트 조회하기(폴링) */
export interface EngduPartResponse {
  partType: EngduPartType;
  status: EngduPartStatus;
  data: EngduPartData | null;
}

export async function getEngduPart(engduId: number, partType: EngduPartType) {
  const res = await api.get<EngduPartResponse>(`/engdu/${engduId}/part/${partType}`);
  return res.data;
}


/** 잉듀에 좋아요/싫어요 누르기 */
export async function postEngduLike(engduId: number, likeStatus: LikeStatus) {
  const res = await api.post(`/engdu/${engduId}/like`, { likeStatus });
  return res.data;
}
