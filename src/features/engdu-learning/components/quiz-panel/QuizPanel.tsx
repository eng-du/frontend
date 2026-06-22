import type { RefObject } from 'react';
import type { EngduQuestion } from '@/types/quiz';
import QuizCard from './QuizCard';
import QuizContent from './QuizContent';
import QuizCardSkeleton from '../skeleton/QuizCardSkeleton';
import QuizContentSkeleton from '../skeleton/QuizContentSkeleton';
import type { EngduDetailResponse } from '@/api/engdu';
import { cn } from '@/utils/cn';

interface QuizPanelProps {
  engduId: number;
  questions: EngduQuestion[];
  handleQuestion: (questionId: number, isCorrected: boolean, answer: number) => void;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  isGenerating: boolean;
  onFinish: () => void;
  engduDetail?: EngduDetailResponse;
  isMobile?: boolean;
  scrollContainerRef?: RefObject<HTMLDivElement | null>;
}

function QuizPanel({
  engduId,
  questions,
  handleQuestion,
  step,
  setStep,
  isGenerating,
  onFinish,
  engduDetail,
  isMobile,
  scrollContainerRef,
}: QuizPanelProps) {
  const isInitial = step < 2;
  const currentPart = isInitial ? engduDetail?.parts.INITIAL : engduDetail?.parts.COMPLETE;

  if ((isGenerating && !currentPart) || !questions[step]) {
    return (
      <div className={cn(isMobile ? 'w-full' : 'sticky top-0 h-fit')}>
        {isMobile ? <QuizContentSkeleton /> : <QuizCardSkeleton />}
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
    <div className={cn(isMobile ? 'w-full' : 'sticky top-0 h-fit')}>
      {isMobile ? (
        <QuizContent
          key={question.questionId}
          {...commonProps}
          isMobile={isMobile}
          scrollContainerRef={scrollContainerRef}
        />
      ) : (
        <QuizCard key={question.questionId} {...commonProps} />
      )}
    </div>
  );
}

export default QuizPanel;
