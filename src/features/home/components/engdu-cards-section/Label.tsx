import type { EngduSummary } from '@/types/engdu';
import clsx from 'clsx';

interface LabelProps {
  type: EngduSummary['type'];
}

function Label({ type }: LabelProps) {
  return (
    <div
      className={clsx(
        'rounded-2xl border bg-[#FFF0E1] px-3 py-1 text-12 font-bold',
        type === '상황극'
          ? 'boder-[#EFBF04] bg-[#FFFFCC] text-[#EFBF04]'
          : 'boder-[#FF7518] bg-[#FFF0E1] text-[#FF7518]',
      )}
    >
      {type}
    </div>
  );
}

export default Label;
