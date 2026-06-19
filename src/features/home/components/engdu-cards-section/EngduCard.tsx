import Card from '@/components/Card/Card';
import type { EngduSummary } from '@/types/engdu';
import ClockIcon from '@/assets/icons/clock.svg?react';
import BookIcon from '@/assets/icons/book-open.svg?react';
import HashTagIcon from '@/assets/icons/hash.svg?react';
import Label from './Label';
import formatRelativeTime from '@/utils/formatRelativeTime';
import LearnActionButton from './LearnActionButton';
import { cn } from '@/utils/cn';

interface EngduCardProps {
  engdu: EngduSummary;
  device?: 'desktop' | 'tablet' | 'mobile';
}

function EngduCard({ engdu, device = 'desktop' }: EngduCardProps) {
  const progress = engdu.totalCount > 0 ? (engdu.solvedCount / engdu.totalCount) * 100 : 0;
  const isMobile = device === 'mobile';

  return (
    <Card>
      <div className="flex w-full items-center gap-2 text-text-secondary">
        <Label type={'지문'} />
        <div className="flex items-center gap-0.5 overflow-hidden text-14">
          <HashTagIcon className="h-4 w-4 shrink-0" />
          <span className="w-full truncate">{engdu.topic}</span>
        </div>
      </div>
      {/* 제목 */}
      <div
        className={cn(
          'w-full font-bold',
          isMobile ? 'truncate text-16' : 'line-clamp-2 h-16 text-20',
        )}
      >
        {engdu.title}
      </div>
      {/* 생성 날짜, 진행률 */}
      <div className={cn('flex gap-5 text-text-secondary', isMobile ? 'text-14' : 'text-16')}>
        <div className="flex items-center gap-2">
          <ClockIcon className="size-4" />
          <div>{formatRelativeTime(engdu.createdAt)}</div>
        </div>
        <div className="flex items-center gap-2">
          <BookIcon className="size-4" />
          <div>{progress}% 완료</div>
        </div>
      </div>
      {/* 진행률 프로그래스바 */}
      <div className="h-2.5 w-full rounded-2xl bg-surface-brand-default/32">
        <div
          className="h-full rounded-2xl bg-surface-brand-default"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      {/* 버튼 */}
      <LearnActionButton engduId={engdu.engduId} progress={progress} device={device === 'desktop' ? 'desktop' : 'mobile'} />
    </Card>
  );
}

export default EngduCard;
