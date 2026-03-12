import { useState, useEffect } from 'react';
import type { EngduLearningLayoutProps } from './EngduLearningDesktop';
import ReaderSection from '../reader-section/ReaderSection';
import QuizPanel from '../quiz-panel/QuizPanel';
import type { EngduQuestion } from '@/types/quiz';
import TitleSkeleton from '../skeleton/TitleSkeleton';
import QuizStepper from '../progress-header/QuizStepper';
import Tab from '../tab/Tab';
import PartButton from '../button/PartButton';

type Tab = '지문' | '퀴즈';

function EngduLearningMobile({
  engduId,
  engduDetail,
  allQuestions,
  initialQuestions,
  completeQuestions,
  step,
  setStep,
  handleQuestion,
  isInitialGenerating,
  isCompleteGenerating,
  onFinish,
}: EngduLearningLayoutProps) {
  const [activeTab, setActiveTab] = useState<Tab>('지문');
  const [activePart, setActivePart] = useState<1 | 2>(1);
  const isLocked = !initialQuestions.every((q: EngduQuestion) => q.isCorrected);
  const isAllSolved =
    initialQuestions.every((q: EngduQuestion) => q.isCorrected) &&
    completeQuestions.every((q: EngduQuestion) => q.isCorrected);

  useEffect(() => {
    if (!isAllSolved && !isLocked) {
      setActivePart(2);
    }
  }, [isLocked, isAllSolved]);

  return (
    <div className="flex h-[calc(100dvh-60px)] justify-center">
      <div className="relative flex h-full w-full max-w-120 flex-col gap-4 bg-surface-weak px-7 py-4">
        {!engduDetail?.meta?.title ? (
          <TitleSkeleton />
        ) : (
          <div className="@container overflow-hidden whitespace-nowrap">
            <div className="animate-title-scroll font-pinkfong text-32 font-bold">
              {engduDetail?.meta?.title}
            </div>
          </div>
        )}

        {activeTab === '지문' && (
          <div className="flex gap-2">
            <PartButton
              label="PART 1"
              isActive={activePart === 1}
              onClick={() => setActivePart(1)}
            />
            <PartButton
              label="PART 2"
              isActive={activePart === 2}
              disabled={isLocked}
              onClick={() => !isLocked && setActivePart(2)}
            />
          </div>
        )}

        {activeTab === '퀴즈' && (
          <QuizStepper
            step={step}
            setStep={setStep}
            isQuestionsCorrected={allQuestions.map((q: EngduQuestion) => q.isCorrected)}
            isInitialReady={!!engduDetail?.parts.INITIAL}
            isCompleteReady={!!engduDetail?.parts.COMPLETE}
          />
        )}
        <div className="scrollbar-custom mb-23 flex-1 overflow-y-auto pr-4">
          {activeTab === '지문' ? (
            <ReaderSection
              initialArticle={engduDetail?.parts.INITIAL?.article}
              completeArticle={engduDetail?.parts.COMPLETE?.article}
              isLocked={isLocked}
              isAllSolved={isAllSolved}
              isMobile={true}
              activePart={activePart}
              onPartChange={setActivePart}
            />
          ) : (
            <QuizPanel
              engduId={engduId}
              questions={allQuestions}
              step={step}
              setStep={setStep}
              handleQuestion={handleQuestion}
              isGenerating={isInitialGenerating || (step >= 2 && isCompleteGenerating)}
              onFinish={onFinish}
              engduDetail={engduDetail}
              isMobile={true}
            />
          )}
        </div>

        <Tab activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
}

export default EngduLearningMobile;
