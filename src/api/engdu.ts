import type {
  DetailEngdu,
  EngduSummary,
  SortOption,
  StatusOption,
  TypeOption,
} from '@/types/engdu';
import api from './api';

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
