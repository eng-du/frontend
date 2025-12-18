import type { EngduSummary } from '@/types/engdu';
import EngduCard from './EngduCard';

interface EngduList {
  engdus: EngduSummary[];
}

function EngduCards({ engdus }: EngduList) {
  return (
    <div className="grid grid-cols-3 gap-7">
      {engdus.map((engdu) => (
        <EngduCard key={engdu.id} engdu={engdu} />
      ))}
    </div>
  );
}

export default EngduCards;
