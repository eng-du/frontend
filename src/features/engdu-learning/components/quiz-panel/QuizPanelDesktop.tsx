import type { EngduQuestion } from '@/types/quiz';
import QuizCard from './QuizCard';
import QuizCardSkeleton from '../skeleton/QuizCardSkeleton';
import type { EngduDetailResponse } from '@/api/engdu';

interface QuizPanelDesktopProps {
  engduId: number;
  questions: EngduQuestion[];
  handleQuestion: (questionId: number, isCorrected: boolean, answer: number) => void;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  isGenerating: boolean;
  onFinish: () => void;
  engduDetail?: EngduDetailResponse;
}

function QuizPanelDesktop({
  engduId,
  questions,
  handleQuestion,
  step,
  setStep,
  isGenerating,
  onFinish,
  engduDetail,
}: QuizPanelDesktopProps) {
  const isInitial = step < 2;
  const currentPart = isInitial ? engduDetail?.parts.INITIAL : engduDetail?.parts.COMPLETE;

  if ((isGenerating && !currentPart) || !questions[step]) {
    return (
      <div className="sticky top-0 h-fit">
        <QuizCardSkeleton />
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
    <div className="sticky top-0 h-fit">
      <QuizCard key={question.questionId} {...commonProps} />
    </div>
  );
}

export default QuizPanelDesktop;
