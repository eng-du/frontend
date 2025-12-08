import type { EngduSummary } from '@/types/engdu';
import EngduCard from './EngduCard';

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

function EngDuList() {
  return (
    <div className="grid grid-cols-3 gap-7">
      {mockEngdus.map((engdu) => (
        <EngduCard key={engdu.id} engdu={engdu} />
      ))}
    </div>
  );
}

export default EngDuList;
