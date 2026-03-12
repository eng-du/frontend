import Card from '@/components/Card/Card';
import QuizContentSkeleton from './QuizContentSkeleton';

function QuizCardSkeleton() {
  return (
    <Card className="flex h-fit w-full flex-col gap-6">
      <QuizContentSkeleton />
    </Card>
  );
}

export default QuizCardSkeleton;
