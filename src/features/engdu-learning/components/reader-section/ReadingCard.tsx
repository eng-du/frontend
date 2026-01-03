import Card from '@/components/Card';
import Label from './Label';

interface ReadingCardProps {
  part: 1 | 2;
  content: string;
}

function ReadingCard({ part, content }: ReadingCardProps) {
  return (
    <Card className="h-[calc(100dvh-280px)] w-full snap-start">
      <Label part={part} />
      <div className="text-20">{content}</div>
    </Card>
  );
}

export default ReadingCard;
