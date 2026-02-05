import Card from '@/components/Card/Card';
import Label from './Label';
import type { EngduArticle } from '@/types/engdu';
import Chunk from './Chunk';

interface ReadingCardProps {
  part: 1 | 2;
  article: EngduArticle;
}

function ReadingCard({ part, article }: ReadingCardProps) {
  return (
    <Card className="h-[calc(100dvh-280px)] w-full snap-start">
      <Label part={part} />
      <div className="scrollbar-custom overflow-x-hidden overflow-y-scroll pr-4 text-20 leading-10 -tracking-tight break-keep">
        {article.chunks.map((chunk, index) => (
          <Chunk key={index} chunk={chunk} />
        ))}
      </div>
    </Card>
  );
}

export default ReadingCard;
