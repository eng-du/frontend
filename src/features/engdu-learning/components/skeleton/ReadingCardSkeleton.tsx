import Card from '@/components/Card/Card';
import ReadingContentSkeleton from './ReadingContentSkeleton';
import Label from '../reader-section/Label';
import EngduStudyCallout from '@/components/EngduCallout/EngduStudyCallout';

function ReadingCardSkeleton({ part }: { part: 1 | 2 }) {
  return (
    <Card className="flex h-[calc(100dvh-280px)] w-full snap-start flex-col gap-6">
      <Label part={part} />
      <ReadingContentSkeleton className="flex-1" />
      {part === 2 && (
        <EngduStudyCallout>
          <div className="font-semibold">Part1 완료! 정말 대단해요 👏</div>
          <div>지금 Part2를 열심히 쓰고있어요.</div>
          <div>조금만 기다려주세요!</div>
        </EngduStudyCallout>
      )}
    </Card>
  );
}

export default ReadingCardSkeleton;
