import { useState, useEffect, useRef } from 'react';
import type { EngduLearningLayoutProps } from './EngduLearningDesktop';
import ReaderSection from '../reader-section/ReaderSection';
import QuizPanelMobile from '../quiz-panel/QuizPanelMobile';
import type { EngduQuestion } from '@/types/quiz';
import TitleSkeleton from '../skeleton/TitleSkeleton';
import QuizStepper from '../progress-header/QuizStepper';
import Tab from '@/components/Tab/Tab';
import TabItem from '@/components/Tab/TabItem';
import PartButton from '../button/PartButton';
import { useDeviceType } from '@/hooks/useMediaQuery';
import { cn } from '@/utils/cn';

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

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const quizScrollRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const isSnapEnabledRef = useRef(true);

  const deviceType = useDeviceType();
  const isMobile = deviceType === 'mobile';
  const isDesktop = deviceType === 'desktop';

  const isLocked =
    !engduDetail?.parts.INITIAL || !initialQuestions.every((q: EngduQuestion) => q.isCorrected);
  const isAllSolved =
    initialQuestions.every((q: EngduQuestion) => q.isCorrected) &&
    !!engduDetail?.parts.COMPLETE &&
    completeQuestions.every((q: EngduQuestion) => q.isCorrected);

  useEffect(() => {
    if (!isAllSolved && !isLocked) {
      setActivePart(2);
    }
  }, [isLocked, isAllSolved]);

  // 퀴즈 번호 이동 시 퀴즈 스크롤 최상단 초기화
  useEffect(() => {
    if (quizScrollRef.current) {
      quizScrollRef.current.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [step]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (!stickyRef.current || !scrollContainerRef.current) return;
    const scrollTop = e.currentTarget.scrollTop;
    const threshold = stickyRef.current.offsetTop;

    const shouldEnable = scrollTop < threshold;
    if (isSnapEnabledRef.current !== shouldEnable) {
      isSnapEnabledRef.current = shouldEnable;
      if (shouldEnable) {
        scrollContainerRef.current.classList.add('snap-y', 'snap-proximity');
      } else {
        scrollContainerRef.current.classList.remove('snap-y', 'snap-proximity');
      }
    }
  };

  const handleTabChange = (tab: Tab) => {
    setActiveTab(tab);
  };

  return (
    <div
      className={cn(
        'relative flex w-full justify-center overflow-hidden',
        isMobile ? 'h-full' : 'h-[calc(100dvh-60px)]',
      )}
    >
      {/* 지문 탭 렌더링 */}
      {activeTab === '지문' && (
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className={cn(
            'scrollbar-none relative flex h-full w-full flex-col gap-4 overflow-y-auto bg-surface-weak pb-28',
            isSnapEnabledRef.current ? 'snap-y snap-proximity' : '',
            isMobile ? 'px-5' : 'max-w-120 px-7',
          )}
        >
          {/* 제목 */}
          {!engduDetail?.meta?.title ? (
            <div className="shrink-0 snap-start pt-4">
              <TitleSkeleton />
            </div>
          ) : (
            <h1 className="shrink-0 snap-start pt-4 font-pinkfong text-28 font-bold [word-break:break-word] text-text-primary">
              {engduDetail?.meta?.title}
            </h1>
          )}

          {/* 상단 Sticky 컨트롤 영역 (파트 탭 바) */}
          <div
            ref={stickyRef}
            className={cn(
              'sticky top-0 z-10 shrink-0 snap-start bg-surface-weak pt-3 pb-2',
              isMobile ? '-mx-5 px-5' : '-mx-7 px-7',
            )}
          >
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
          </div>

          <div className="w-full">
            <ReaderSection
              initialArticle={engduDetail?.parts.INITIAL?.article}
              completeArticle={engduDetail?.parts.COMPLETE?.article}
              isLocked={isLocked}
              isAllSolved={isAllSolved}
              isMobile={true}
              activePart={activePart}
              onPartChange={setActivePart}
            />
          </div>
        </div>
      )}

      {/* 퀴즈 탭 렌더링 */}
      {activeTab === '퀴즈' && (
        <div
          className={cn(
            'relative flex h-full w-full flex-col bg-surface-weak pb-28 pt-4',
            isMobile ? 'px-5' : 'max-w-120 px-7',
          )}
        >
          {/* 상단 퀴즈 스텝바 고정 */}
          <div className="shrink-0 pt-3 pb-2">
            <QuizStepper
              step={step}
              setStep={setStep}
              isQuestionsCorrected={allQuestions.map((q: EngduQuestion) => q.isCorrected)}
              isInitialReady={!!engduDetail?.parts.INITIAL}
              isCompleteReady={!!engduDetail?.parts.COMPLETE}
              isDesktop={isDesktop}
            />
          </div>

          {/* 퀴즈 내용 영역 (자체 내부 스크롤) */}
          <div
            ref={quizScrollRef}
            className="scrollbar-none w-full flex-1 overflow-y-auto"
          >
            <QuizPanelMobile
              engduId={engduId}
              questions={allQuestions}
              step={step}
              setStep={setStep}
              handleQuestion={handleQuestion}
              isGenerating={isInitialGenerating || (step >= 2 && isCompleteGenerating)}
              onFinish={onFinish}
              engduDetail={engduDetail}
              scrollContainerRef={quizScrollRef}
            />
          </div>
        </div>
      )}

      {/* 하단 고정 지문/퀴즈 전환 스위처 */}
      <Tab
        className={cn(
          'absolute z-20 grid h-14 grid-cols-2 gap-3 rounded-xl border border-border-default bg-surface-weak p-2 shadow-default',
          isMobile ? 'right-5 bottom-0 left-5' : 'bottom-4 left-1/2 w-[424px] -translate-x-1/2',
        )}
      >
        <TabItem
          label="지문"
          selected={activeTab === '지문'}
          onClick={() => handleTabChange('지문')}
          variant="dark"
          className="h-full w-full rounded-md text-14"
        />
        <TabItem
          label="퀴즈"
          selected={activeTab === '퀴즈'}
          onClick={() => handleTabChange('퀴즈')}
          variant="dark"
          className="h-full w-full rounded-md text-14"
        />
      </Tab>
    </div>
  );
}

export default EngduLearningMobile;
