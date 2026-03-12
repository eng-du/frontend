import type { EngduArticle } from '@/types/engdu';
import Chunk from './Chunk';
import { cn } from '@/utils/cn';

interface ReadingContentProps {
  article: EngduArticle;
  className?: string;
}

function ReadingContent({ article, className }: ReadingContentProps) {
  return (
    <div
      className={cn(
        'scrollbar-custom overflow-x-hidden overflow-y-scroll pr-4 text-20 leading-10 -tracking-tight break-keep',
        className,
      )}
    >
      {article.chunks.map((chunk, index) => (
        <Chunk key={index} chunk={chunk} />
      ))}
    </div>
  );
}

export default ReadingContent;
