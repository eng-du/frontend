import type { EngduSummary } from '@/types/engdu';
import Dropdown from './filter-section/Dropdown';
import NewEngduButton from './filter-section/NewEngduButton';
import EngduCards from './engdu-cards-section/EngduCards';
import { useState } from 'react';
import EmptyCard from './engdu-cards-section/EmptyCard';

const mockEngdus: EngduSummary[] = [];

type SortOption = '최신순' | '오래된순';
type TypeOption = '전체' | '지문' | '상황극';
type StatusOption = '전체' | '완료' | '미완료';

function EngduList() {
  const [sort, setSort] = useState<SortOption>('최신순');
  const [type, setType] = useState<TypeOption>('전체');
  const [status, setStatus] = useState<StatusOption>('전체');

  const filterEngdu = (engdus: EngduSummary[]) => {
    return engdus
      .filter((engdu) => (type === '전체' ? true : engdu.type === type))
      .filter((engdu) =>
        status === '전체'
          ? true
          : status === '완료'
            ? engdu.progress === 100
            : engdu.progress < 100,
      )
      .sort((a, b) =>
        sort === '최신순'
          ? b.createdAt.getTime() - a.createdAt.getTime()
          : a.createdAt.getTime() - b.createdAt.getTime(),
      );
  };

  return (
    <div>
      {/* 나의 잉듀 목록 */}
      <div className="flex flex-col gap-7 px-25 py-10">
        {/* 제목 */}
        <div className="flex flex-col gap-2">
          <h2 className="font-pinkfong text-36">나의 잉듀 목록</h2>
          <div className="text-text-secondary">
            생성된 잉듀를 읽고 퀴즈를 풀며 나만의 영어 학습을 이어가세요.
          </div>
        </div>
        {/* 필터링 버튼, 생성 버튼 */}
        <div className="flex justify-between">
          <div className="flex gap-2.5">
            <Dropdown filterKey="sort" value={sort} setValue={setSort} />
            <Dropdown filterKey="type" value={type} setValue={setType} />
            <Dropdown filterKey="status" value={status} setValue={setStatus} />
          </div>
          <NewEngduButton />
        </div>
        {/* 목록 */}
        {mockEngdus.length > 0 ? <EngduCards engdus={filterEngdu(mockEngdus)} /> : <EmptyCard />}
      </div>
    </div>
  );
}

export default EngduList;
