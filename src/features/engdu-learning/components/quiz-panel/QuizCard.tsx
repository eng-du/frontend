import Card from '@/components/Card/Card';
import type { EngduQuestion } from '@/types/quiz';
import QuizContent from './QuizContent';

interface QuizCardProps {
  engduId: number;
  questionId: number;
  question: EngduQuestion;
  handleQuestion: (questionId: number, isCorrected: boolean, answer: number) => void;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  onFinish: () => void;
}

function QuizCard(props: QuizCardProps) {
  return (
    <Card className="h-fit w-full">
      <QuizContent {...props} />
    </Card>
  );
}

export default QuizCard;
