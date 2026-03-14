import type { QuizStatus } from '@/types/quiz';
import { cn } from '@/utils/cn';

interface QuizFeedbackCardProps {
  status: QuizStatus;
  feedback: string;
}

function QuizFeedbackCard({ status, feedback }: QuizFeedbackCardProps) {
  return (
    <div
      className={cn(
        'w-full rounded-xl border px-7 py-3 text-14 xl:rounded-2xl xl:text-16',
        status === 'correct' && 'border-border-positive bg-surface-positive text-text-positive',
        status === 'incorrect' && 'border-border-danger bg-surface-danger text-text-danger',
      )}
    >
      {feedback}
    </div>
  );
}

export default QuizFeedbackCard;
