import { getEngdus } from '@/api/engdu';
import { useEngduParams } from '@/hooks/useEngduParams';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import EmptyCard from './engdu-cards-section/EmptyCard';
import EngduCards from './engdu-cards-section/EngduCards';
import EngduListPagination from './EngduListPagination';
import Dropdown from './filter-section/Dropdown';
import NewEngduButton from './filter-section/NewEngduButton';
import EngduFullFindIcon from '@/assets/icons/engdu-full-find.svg?react';
import EngduFullNoticeIcon from '@/assets/icons/engdu-full-notice.svg?react';
import { useIsDesktop } from '@/hooks/useMediaQuery';

interface EngduListProps {
  onOpenHandler: () => void;
}

function EngduList({ onOpenHandler }: EngduListProps) {
  const isDesktop = useIsDesktop();

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
        {/* 데이터 및 필터 영역 */}
        {!isDesktop && (
          <div className="flex items-center gap-4 rounded-xl border border-border-accent bg-surface-accent/20 px-6 py-4 text-text-accent">
            <EngduFullNoticeIcon className="h-6 w-6" />
            <span>잉듀 생성 및 학습은 1280px 이상의 데스크탑에서 진행해주세요.</span>
          </div>
        )}
        <EngduListContent onOpenHandler={onOpenHandler} />
      </div>
    </div>
  );
}

function EngduListContent({ onOpenHandler }: EngduListProps) {
  const { page, sort, type, status, setSort, setStatus, setPage } = useEngduParams();
  const isDesktop = useIsDesktop();

  const { data, isPending } = useQuery({
    queryKey: ['engdu', 'engdus', { page, sort, type, status }],
    queryFn: () => getEngdus({ page, sort, type, status }),
    placeholderData: keepPreviousData,
  });

  if (isPending) {
    return null;
  }

  const engdus = data?.content ?? [];
  const totalPages = data?.totalPages ?? 0;
  const hasEngdu = data?.hasEngdu ?? false;

  if (!hasEngdu) {
    return <EmptyCard onOpenHandler={onOpenHandler} />;
  }

  return (
    <>
      {/* 필터링 버튼, 생성 버튼 */}
      <div className="flex flex-col justify-between gap-2.5 md:flex-row">
        <div className="flex gap-2.5">
          <Dropdown filterKey="sort" value={sort} setValue={setSort} />
          <Dropdown filterKey="status" value={status} setValue={setStatus} />
        </div>
        {isDesktop && <NewEngduButton onOpenHandler={onOpenHandler} />}
      </div>

      {/* 잉듀 목록 */}
      {engdus.length > 0 ? (
        <>
          <EngduCards engdus={engdus} />
          <EngduListPagination totalPages={totalPages} page={page} onChangePage={setPage} />
        </>
      ) : (
        <div className="flex flex-col items-center gap-4">
          <EngduFullFindIcon />
          <div className="text-center text-text-secondary">
            조건을 만족하는 잉듀를 찾을 수 없어요.
            <br />
            조건을 변경해 다시 검색해보세요!
          </div>
        </div>
      )}
    </>
  );
}

export default EngduList;
