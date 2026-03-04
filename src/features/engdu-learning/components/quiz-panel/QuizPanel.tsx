import type { EngduQuestion } from '@/types/quiz';
import QuizCard from './QuizCard';
import QuizCardSkeleton from '../skeleton/QuizCardSkeleton';
import type { EngduDetailResponse } from '@/api/engdu';

interface QuizPanelProps {
  engduId: number;
  questions: EngduQuestion[];
  handleQuestion: (questionId: number, isCorrected: boolean, answer: number) => void;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  isGenerating: boolean;
  onFinish: () => void;
  engduDetail?: EngduDetailResponse;
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
}: QuizPanelProps) {
  const isPart1 = step < 2;
  const currentPart = isPart1 ? engduDetail?.parts.INITIAL : engduDetail?.parts.COMPLETE;

  if (isGenerating && !currentPart) {
    return (
      <div className="sticky top-0 h-fit">
        <QuizCardSkeleton />
      </div>
    );
  }

  const question = questions[step];

  if (!question) {
    return (
      <div className="sticky top-0 h-fit">
        <QuizCardSkeleton />
      </div>
    );
  }

  return (
    <div className="sticky top-0 h-fit">
      <QuizCard
        key={question.questionId}
        engduId={engduId}
        questionId={question.questionId}
        question={question}
        handleQuestion={handleQuestion}
        step={step}
        setStep={setStep}
        onFinish={onFinish}
      />
    </div>
  );
}

export default QuizPanel;
