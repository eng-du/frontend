import type { EngduQuestion } from '@/types/quiz';
import QuizCard from './QuizCard';

interface ActionPanelProps {
  questions: EngduQuestion[];
  setQuestions: React.Dispatch<React.SetStateAction<EngduQuestion[]>>;
  step: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
}

function QuizPanel({ questions, setQuestions, step, setStep }: ActionPanelProps) {
  const question = questions[step];

  return (
    <div className="sticky top-0 h-fit">
      <QuizCard
        key={question.questionId}
        question={question}
        setQuestions={setQuestions}
        step={step}
        setStep={setStep}
      />
    </div>
  );
}

export default QuizPanel;
