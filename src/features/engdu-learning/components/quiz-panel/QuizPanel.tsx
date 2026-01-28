import type { EngduQuestion } from '@/types/quiz';
import QuizCard from './QuizCard';

interface ActionPanelProps {
  engduId: number;
  questions: EngduQuestion[];
  handleQuestion: (questionId: number, isCorrected: boolean, answer: number) => void;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

function QuizPanel({ engduId, questions, handleQuestion, step, setStep }: ActionPanelProps) {
  const question = questions[step];

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
      />
    </div>
  );
}

export default QuizPanel;
