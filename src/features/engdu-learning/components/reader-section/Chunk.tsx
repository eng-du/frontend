import type { EngduChunk } from '@/types/engdu';
import { cn } from '@/utils/cn';
import { useState } from 'react';

interface ChunkProps {
  chunk: EngduChunk;
}

function Chunk({ chunk }: ChunkProps) {
  const [isTranslate, setIsTranslate] = useState(false);
  return (
    <span
      className={cn(
        'mr-1 cursor-pointer rounded-lg px-1 py-1 transition-colors',
        'hover:bg-surface-brand/10',
        isTranslate && 'bg-surface-strong text-text-secondary',
      )}
      onClick={() => setIsTranslate((prev) => !prev)}
    >
      {isTranslate ? chunk.kor : chunk.en}
    </span>
  );
}

export default Chunk;
