import {
  SORT_MAP,
  TYPE_MAP,
  STATUS_MAP,
  REVERSE_SORT_MAP,
  REVERSE_TYPE_MAP,
  REVERSE_STATUS_MAP,
  type SortOption,
  type TypeOption,
  type StatusOption,
} from '@/types/engdu';
import { useSearchParams } from 'react-router';


export function useEngduParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const pageParam = searchParams.get('page');
  const page = pageParam ? parseInt(pageParam, 10) : 1;

  const sortParam = searchParams.get('sort');
  const sort = sortParam && SORT_MAP[sortParam] ? SORT_MAP[sortParam] : '최신순';

  const typeParam = searchParams.get('type');
  const type = typeParam && TYPE_MAP[typeParam] ? TYPE_MAP[typeParam] : '전체';

  const statusParam = searchParams.get('status');
  const status = statusParam && STATUS_MAP[statusParam] ? STATUS_MAP[statusParam] : '전체';

  const updateParams = (newParams: Record<string, string | number | null>) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      Object.entries(newParams).forEach(([key, value]) => {
        if (value === null) {
          next.delete(key);
        } else {
          next.set(key, String(value));
        }
      });
      return next;
    });
  };

  const setPage = (newPage: number) => {
    updateParams({ page: newPage > 1 ? newPage : null }); 
  };

  const setSort = (newSort: SortOption) => {
    updateParams({
      sort: REVERSE_SORT_MAP[newSort],
      page: null,
    });
  };

  const setType = (newType: TypeOption) => {
    updateParams({
      type: REVERSE_TYPE_MAP[newType],
      page: null,
    });
  };

  const setStatus = (newStatus: StatusOption) => {
    updateParams({
      status: REVERSE_STATUS_MAP[newStatus],
      page: null,
    });
  };

  return {
    page,
    sort,
    type,
    status,
    setPage,
    setSort,
    setType,
    setStatus,
  };
}
