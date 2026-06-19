import { getEngdus } from '@/api/engdu';
import { useEngduParams } from '@/hooks/useEngduParams';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import EmptyCard from './engdu-cards-section/EmptyCard';
import EngduCards from './engdu-cards-section/EngduCards';
import EngduListPagination from './EngduListPagination';
import Dropdown from './filter-section/Dropdown';
import NewEngduButton from './filter-section/NewEngduButton';
import EngduFullFindIcon from '@/assets/icons/engdu-full-find.svg?react';
import { useDeviceType } from '@/hooks/useMediaQuery';
import { useAuth } from '@/hooks/useAuth';

interface EngduListProps {
  onOpenHandler: () => void;
}

interface EngduListContentProps extends EngduListProps {
  device?: 'desktop' | 'tablet' | 'mobile';
}

function EngduList({ onOpenHandler }: EngduListProps) {
  const { user } = useAuth();
  const deviceType = useDeviceType();
  const isMobile = deviceType === 'mobile';

  if (isMobile) {
    return (
      <div className="flex w-full flex-col gap-6">
        {/* 안녕하세요, 사용자이름님 */}
        <div className="flex flex-col gap-1.5">
          <span className="text-14 font-medium text-text-secondary">안녕하세요,</span>
          <h1 className="font-pinkfong text-24 font-bold text-text-primary">{user?.name}님</h1>
        </div>

        {/* 나의 잉듀 목록 */}
        <div className="flex flex-col gap-3">
          <h2 className="font-pinkfong text-20 font-bold text-text-primary">나의 잉듀 목록</h2>
          <EngduListContent onOpenHandler={onOpenHandler} device="mobile" />
        </div>
      </div>
    );
  }

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
        <EngduListContent onOpenHandler={onOpenHandler} device={deviceType} />
      </div>
    </div>
  );
}

function EngduListContent({ onOpenHandler, device = 'desktop' }: EngduListContentProps) {
  const { page, sort, type, status, setSort, setStatus, setPage } = useEngduParams();

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
        <NewEngduButton onOpenHandler={onOpenHandler} />
      </div>

      {/* 잉듀 목록 */}
      {engdus.length > 0 ? (
        <>
          <EngduCards engdus={engdus} device={device} />
          <EngduListPagination totalPages={totalPages} page={page} onChangePage={setPage} />
        </>
      ) : (
        <div className="flex flex-col items-center gap-4 py-8 md:py-0">
          <EngduFullFindIcon className="h-auto w-32 md:w-auto" />
          <div className="text-center text-14 text-text-secondary md:text-16">
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
