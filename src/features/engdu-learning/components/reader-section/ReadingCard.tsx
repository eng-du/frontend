import Card from '@/components/Card/Card';
import Label from './Label';
import type { EngduArticle } from '@/types/engdu';
import ReadingContent from './ReadingContent';

interface ReadingCardProps {
  part: 1 | 2;
  article: EngduArticle;
}

function ReadingCard({ part, article }: ReadingCardProps) {
  return (
    <Card className="h-[calc(100dvh-280px)] w-full snap-start">
      <Label part={part} />
      <ReadingContent article={article} />
    </Card>
  );
}

export default ReadingCard;
