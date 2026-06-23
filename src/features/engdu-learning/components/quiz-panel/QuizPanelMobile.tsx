import type { RefObject } from 'react';
import type { EngduQuestion } from '@/types/quiz';
import QuizContent from './QuizContent';
import QuizContentSkeleton from '../skeleton/QuizContentSkeleton';
import type { EngduDetailResponse } from '@/api/engdu';

interface QuizPanelMobileProps {
  engduId: number;
  questions: EngduQuestion[];
  handleQuestion: (questionId: number, isCorrected: boolean, answer: number) => void;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  isGenerating: boolean;
  onFinish: () => void;
  engduDetail?: EngduDetailResponse;
  scrollContainerRef?: RefObject<HTMLDivElement | null>;
}

function QuizPanelMobile({
  engduId,
  questions,
  handleQuestion,
  step,
  setStep,
  isGenerating,
  onFinish,
  engduDetail,
  scrollContainerRef,
}: QuizPanelMobileProps) {
  const isInitial = step < 2;
  const currentPart = isInitial ? engduDetail?.parts.INITIAL : engduDetail?.parts.COMPLETE;

  if ((isGenerating && !currentPart) || !questions[step]) {
    return (
      <div className="w-full h-full">
        <QuizContentSkeleton />
      </div>
    );
  }

  const question = questions[step];

  const commonProps = {
    engduId,
    questionId: question.questionId,
    question,
    handleQuestion,
    step,
    setStep,
    onFinish,
  };

  return (
    <div className="w-full h-full">
      <QuizContent
        key={question.questionId}
        {...commonProps}
        isMobile={true}
        scrollContainerRef={scrollContainerRef}
      />
    </div>
  );
}

export default QuizPanelMobile;
