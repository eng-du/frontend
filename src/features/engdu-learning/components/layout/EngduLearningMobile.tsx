import { useState, useEffect, useRef } from 'react';
import type { EngduLearningLayoutProps } from './EngduLearningDesktop';
import ReaderSection from '../reader-section/ReaderSection';
import QuizPanel from '../quiz-panel/QuizPanel';
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
  const stickyRef = useRef<HTMLDivElement>(null);
  const isSnapEnabledRef = useRef(true);
  const activeTabRef = useRef<Tab>(activeTab);

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

  // 퀴즈 번호 이동 시 스크롤 최상단 초기화
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [step]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (!stickyRef.current || !scrollContainerRef.current) return;
    // 퀴즈 탭에서는 스냅 비활성
    if (activeTabRef.current !== '지문') return;
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
    activeTabRef.current = tab;
    setActiveTab(tab);
    // 퀴즈 탭으로 전환 시 스냅 즉시 제거
    if (tab === '퀴즈' && scrollContainerRef.current) {
      isSnapEnabledRef.current = false;
      scrollContainerRef.current.classList.remove('snap-y', 'snap-proximity');
    }
    // 지문 탭으로 복귀 시 스냅 복원 (스크롤이 제목 위에 있을 때만)
    if (tab === '지문' && scrollContainerRef.current && stickyRef.current) {
      const scrollTop = scrollContainerRef.current.scrollTop;
      const threshold = stickyRef.current.offsetTop;
      const shouldEnable = scrollTop < threshold;
      isSnapEnabledRef.current = shouldEnable;
      if (shouldEnable) {
        scrollContainerRef.current.classList.add('snap-y', 'snap-proximity');
      } else {
        scrollContainerRef.current.classList.remove('snap-y', 'snap-proximity');
      }
    }
  };

  return (
    <div
      className={cn(
        'relative flex w-full justify-center overflow-hidden',
        isMobile ? 'h-full' : 'h-[calc(100dvh-60px)]',
      )}
    >
      {/* 내부 스크롤 가능한 메인 프레임 영역 */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className={cn(
          'scrollbar-none relative flex h-full w-full flex-col gap-4 overflow-y-auto bg-surface-weak pb-18',
          isSnapEnabledRef.current ? 'snap-y snap-proximity' : '',
          isMobile ? 'px-5' : 'max-w-120 px-7',
          activeTab === '퀴즈' && 'pt-4',
        )}
      >
        {/* 제목 - 지문 탭일 때만 표시 */}
        {activeTab === '지문' &&
          (!engduDetail?.meta?.title ? (
            <div className="shrink-0 snap-start pt-4">
              <TitleSkeleton />
            </div>
          ) : (
            <h1 className="shrink-0 snap-start pt-4 font-pinkfong text-28 font-bold [word-break:break-word] text-text-primary">
              {engduDetail?.meta?.title}
            </h1>
          ))}

        {/* 상단 Sticky 컨트롤 영역 (파트 탭 바 또는 퀴즈 스텝바 고정) */}
        {/* 음수 마진과 패딩을 이용해 스크롤 시 뒤로 지나가는 텍스트를 완전히 가림 */}
        <div
          ref={stickyRef}
          className={cn(
            'sticky top-0 z-10 shrink-0 snap-start bg-surface-weak pt-3 pb-2',
            isMobile ? '-mx-5 px-5' : '-mx-7 px-7',
          )}
        >
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
              isDesktop={isDesktop}
            />
          )}
        </div>

        {/* 메인 내용 컨텐츠 영역 (자체 내부 스크롤 없음) */}
        <div className="w-full">
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
              scrollContainerRef={scrollContainerRef}
            />
          )}
        </div>
      </div>

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
