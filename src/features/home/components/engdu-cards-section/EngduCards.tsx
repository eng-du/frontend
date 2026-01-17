import type { EngduSummary } from '@/types/engdu';
import EngduCard from './EngduCard';

interface EngduList {
  engdus: EngduSummary[];
}

function EngduCards({ engdus }: EngduList) {
  return (
    <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 xl:grid-cols-3">
      {engdus.map((engdu, index) => (
        <div
          key={engdu.engduId}
          className="animate-fade-in-up"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <EngduCard engdu={engdu} />
        </div>
      ))}
    </div>
  );
}

export default EngduCards;
