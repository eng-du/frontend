import type { EngduType } from '@/types/engdu';
import clsx from 'clsx';

interface LabelProps {
  type: EngduType;
}

function Label({ type }: LabelProps) {
  return (
    <div
      className={clsx(
        'shrink-0 rounded-2xl border bg-[#FFF0E1] px-3 py-1 text-12 font-bold',
        type === '상황극'
          ? 'border-[#EFBF04] bg-[#FFFFCC] text-[#EFBF04]'
          : 'border-[#FF7518] bg-[#FFF0E1] text-[#FF7518]',
      )}
    >
      {type}
    </div>
  );
}

export default Label;
