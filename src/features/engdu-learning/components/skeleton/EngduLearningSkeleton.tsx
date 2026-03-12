import { useState } from 'react';
import TitleSkeleton from './TitleSkeleton';
import QuizCardSkeleton from './QuizCardSkeleton';
import ReadingCardSkeleton from './ReadingCardSkeleton';
import ReadingContentSkeleton from './ReadingContentSkeleton';
import QuizContentSkeleton from './QuizContentSkeleton';
import QuizStepIndicatorSkeleton from './QuizStepIndicatorSkeleton';
import Tab from '../tab/Tab';
import PartButton from '../button/PartButton';

interface EngduLearningSkeletonProps {
  isMobile?: boolean;
  initialTab?: '지문' | '퀴즈';
}

function EngduLearningSkeleton({ isMobile, initialTab = '지문' }: EngduLearningSkeletonProps) {
  const [activeTab, setActiveTab] = useState<'지문' | '퀴즈'>(initialTab);

  if (isMobile) {
    return (
      <div className="flex h-[calc(100dvh-60px)] justify-center">
        <div className="relative flex h-full w-full max-w-120 flex-col gap-4 bg-surface-weak px-7 py-4">
          <TitleSkeleton />
          {activeTab === '지문' ? (
            <div className="flex gap-2">
              <PartButton label="PART 1" isActive />
              <PartButton label="PART 2" disabled />
            </div>
          ) : (
            <div className="flex items-center gap-4 self-center">
              {Array.from({ length: 4 }).map((_, idx) => (
                <QuizStepIndicatorSkeleton key={idx} />
              ))}
            </div>
          )}
          <div className="flex-1 overflow-hidden pb-23">
            {activeTab === '지문' ? (
              <ReadingContentSkeleton className="h-full" />
            ) : (
              <QuizContentSkeleton />
            )}
          </div>
          <Tab activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-full flex-col">
      <div className="grid h-35 w-full grid-cols-[7fr_5fr] gap-10 bg-surface-default px-25 pt-10">
        <TitleSkeleton />
        <div className="flex items-center gap-4 self-center">
          {Array.from({ length: 4 }).map((_, idx) => (
            <QuizStepIndicatorSkeleton key={idx} />
          ))}
        </div>
      </div>
      <div className="pointer-events-none absolute top-35 right-0 left-0 z-10 h-5 bg-surface-default" />
      <div className="grid h-full flex-1 grid-cols-[7fr_5fr] gap-10 overflow-hidden px-25 py-10">
        <ReadingCardSkeleton />
        <div className="sticky top-0 h-fit">
          <QuizCardSkeleton />
        </div>
      </div>
    </div>
  );
}

export default EngduLearningSkeleton;
