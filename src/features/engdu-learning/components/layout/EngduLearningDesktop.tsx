import type { EngduQuestion } from '@/types/quiz';
import type { EngduDetailResponse } from '@/api/engdu';
import ProgressHeader from '../progress-header/ProgressHeader';
import ReaderSection from '../reader-section/ReaderSection';
import QuizPanel from '../quiz-panel/QuizPanel';

export interface EngduLearningLayoutProps {
  engduId: number;
  engduDetail?: EngduDetailResponse;
  allQuestions: EngduQuestion[];
  initialQuestions: EngduQuestion[];
  completeQuestions: EngduQuestion[];
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  handleQuestion: (questionId: number, isCorrected: boolean, answer: number) => void;
  isInitialGenerating: boolean;
  isCompleteGenerating: boolean;
  onFinish: () => void;
}

function EngduLearningDesktop({
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
  return (
    <div className="relative flex h-[calc(100dvh-60px)] flex-col">
      <ProgressHeader
        title={engduDetail?.meta?.title}
        isInitialReady={!!engduDetail?.parts.INITIAL}
        isCompleteReady={!!engduDetail?.parts.COMPLETE}
        step={step}
        setStep={setStep}
        isQuestionsCorrected={allQuestions.map((q: EngduQuestion) => q.isCorrected)}
      />
      <div className="pointer-events-none absolute top-35 right-0 left-0 z-10 h-5 bg-surface-default" />
      <div className="grid h-full flex-1 snap-y snap-mandatory scroll-py-10 grid-cols-[7fr_5fr] gap-10 overflow-scroll px-25 py-10">
        <ReaderSection
          initialArticle={engduDetail?.parts.INITIAL?.article}
          completeArticle={engduDetail?.parts.COMPLETE?.article}
          isLocked={
            !engduDetail?.parts.INITIAL ||
            !initialQuestions.every((q: EngduQuestion) => q.isCorrected)
          }
          isAllSolved={
            initialQuestions.every((q: EngduQuestion) => q.isCorrected) &&
            !!engduDetail?.parts.COMPLETE &&
            completeQuestions.every((q: EngduQuestion) => q.isCorrected)
          }
        />
        <QuizPanel
          engduId={engduId}
          questions={allQuestions}
          step={step}
          setStep={setStep}
          handleQuestion={handleQuestion}
          isGenerating={isInitialGenerating || (step >= 2 && isCompleteGenerating)}
          onFinish={onFinish}
          engduDetail={engduDetail}
        />
      </div>
    </div>
  );
}

export default EngduLearningDesktop;
