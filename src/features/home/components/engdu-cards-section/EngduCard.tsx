import Card from '@/components/Card';
import type { EngduSummary } from '@/types/engdu';
import ClockIcon from '@/assets/icons/clock.svg?react';
import BookIcon from '@/assets/icons/book-open.svg?react';
import HashTagIcon from '@/assets/icons/hash.svg?react';
import Label from './Label';
import formatRelativeTime from '@/utils/formatRelativeTime';
import LearnActionButton from './LearnActionButton';

interface EngduCardProps {
  engdu: EngduSummary;
}

function EngduCard({ engdu }: EngduCardProps) {
  const progress = engdu.totalCount > 0 ? (engdu.solvedCount / engdu.totalCount) * 100 : 0;

  return (
    <Card>
      <div className="flex items-center gap-2 text-text-secondary">
        <Label type={'지문'} />
        <div className="flex items-center">
          <HashTagIcon className="h-4 w-4" />
          {engdu.topic}
        </div>
      </div>
      {/* 제목 */}
      <div className="line-clamp-2 h-16 w-full text-20 font-bold">{engdu.title}</div>
      {/* 생성 날짜, 진행률 */}
      <div className="flex gap-5 text-text-secondary">
        <div className="flex items-center gap-2">
          <ClockIcon />
          <div>{formatRelativeTime(engdu.createdAt)}</div>
        </div>
        <div className="flex items-center gap-2">
          <BookIcon />
          <div>{progress}% 완료</div>
        </div>
      </div>
      {/* 진행률 프로그래스바 */}
      <div className="h-2.5 w-full rounded-2xl bg-surface-brand/32">
        <div
          className="h-full rounded-2xl bg-surface-brand"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      {/* 버튼 */}
      <LearnActionButton engduId={engdu.engduId} progress={progress} />
    </Card>
  );
}

export default EngduCard;
