import type { EngduSummary } from '@/types/engdu';
import Dropdown from './filter-section/Dropdown';
import NewEngduButton from './filter-section/NewEngduButton';
import EngduCards from './engdu-cards-section/EngduCards';
import { useState } from 'react';

const mockEngdus: EngduSummary[] = [
  {
    id: 1,
    type: '지문',
    title: '환경 보호와 마이크로비즈 - 작은 플라스틱의 큰 영향',
    createdAt: new Date('2025-10-25T09:00:00Z'),
    progress: 75,
  },
  {
    id: 2,
    type: '상황극',
    title: '카페에서 주문하기 - 자연스러운 표현 배우기',
    createdAt: new Date('2025-10-24T09:00:00Z'),
    progress: 100,
  },
  {
    id: 3,
    type: '지문',
    title: '우주 탐사의 역사 - 인류의 첫 걸음',
    createdAt: new Date(),
    progress: 100,
  },
  {
    id: 4,
    type: '상황극',
    title:
      '공항에서 수하물 분실 신고하기 - 여행 중 영어로 문제를 설명하고 해결하는 자연스러운 대화 연습',
    createdAt: new Date('2023-10-26T09:00:00Z'),
    progress: 25,
  },
  {
    id: 5,
    type: '지문',
    title: '기후 변화와 북극곰 - 사라지는 빙하의 경고',
    createdAt: new Date('2025-10-23T09:00:00Z'),
    progress: 50,
  },
  {
    id: 6,
    type: '상황극',
    title: '식당에서 메뉴 고르기 - 자연스러운 대화 익히기 ',
    createdAt: new Date('2025-09-21T09:00:00Z'),
    progress: 0,
  },
];

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
        <EngduCards engdus={filterEngdu(mockEngdus)} />
      </div>
    </div>
  );
}

export default EngduList;
