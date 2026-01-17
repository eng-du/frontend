import { getEngdus } from '@/api/engdu';
import { useEngduParams } from '@/hooks/useEngduParams';
import type { EngduSummary } from '@/types/engdu';
import { useEffect, useState } from 'react';
import EmptyCard from './engdu-cards-section/EmptyCard';
import EngduCards from './engdu-cards-section/EngduCards';
import EngduListPagination from './EngduListPagination';
import Dropdown from './filter-section/Dropdown';
import NewEngduButton from './filter-section/NewEngduButton';
import EngduFullFindIcon from '@/assets/icons/engdu-full-find.svg?react';

interface EngduListProps {
  onOpenHandler: () => void;
}

function EngduList({ onOpenHandler }: EngduListProps) {
  const { page, sort, type, status, setSort, setStatus, setPage } = useEngduParams();

  const [hasEngdu, setHasEngdu] = useState(false);
  const [engdus, setEngdus] = useState<EngduSummary[]>([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    (async () => {
      const { content, totalPages, hasEngdu } = await getEngdus({
        page,
        sort,
        type,
        status,
      });
      setEngdus(content);
      setTotalPages(totalPages);
      setHasEngdu(hasEngdu);
    })();
  }, [page, sort, type, status]);

  return (
    <div>
      {/* 나의 잉듀 목록 */}
      <div className="flex flex-col gap-7 px-8 py-10 lg:px-16 xl:px-25">
        {/* 제목 */}
        <div className="flex flex-col gap-2">
          <h2 className="font-pinkfong text-36">나의 잉듀 목록</h2>
          <div className="text-text-secondary">
            생성된 잉듀를 읽고 퀴즈를 풀며 나만의 영어 학습을 이어가세요.
          </div>
        </div>
        {hasEngdu ? (
          <>
            {/* 필터링 버튼, 생성 버튼 */}
            <div className="flex flex-col gap-2.5 justify-between md:flex-row">
              <div className="flex gap-2.5 overflow-x-scroll overflow-scroll [&::-webkit-scrollbar]:hidden">
                <Dropdown filterKey="sort" value={sort} setValue={setSort} />
                {/* <Dropdown filterKey="type" value={type} setValue={setType} /> */}
                <Dropdown filterKey="status" value={status} setValue={setStatus} />
              </div>
              <NewEngduButton onOpenHandler={onOpenHandler} />
            </div>
            {/* 잉듀 목록 */}
            {engdus.length > 0 ? (
              <>
                <EngduCards engdus={engdus} />
                <EngduListPagination totalPages={totalPages} page={page} onChangePage={setPage} />
              </>
            ) : (
              <div className="flex flex-col items-center gap-4">
                <EngduFullFindIcon  />
                <div className="text-text-secondary text-center">
                  조건을 만족하는 잉듀를 찾을 수 없어요.
                  <br />
                  조건을 변경해 다시 검색해보세요!
                </div>
              </div>
            )}
          </>
        ) : (
          <EmptyCard onOpenHandler={onOpenHandler} />
        )}
      </div>
    </div>
  );
}

export default EngduList;
