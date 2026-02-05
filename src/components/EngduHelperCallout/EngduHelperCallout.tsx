import EngduFullNoticeIcon from '@/assets/icons/engdu-full-notice.svg?react';
import type { ReactNode } from 'react';

interface EngduHelperCalloutProps {
  children: ReactNode;
  onClickHandler?: () => void;
}

function EngduHelperCallout({ children, onClickHandler }: EngduHelperCalloutProps) {
  return (
    <div
      className="absolute right-0 bottom-0 flex translate-x-[calc(100%+20px)] flex-col items-center gap-4"
      onClick={onClickHandler}
    >
      <div className="relative rounded-2xl bg-surface-weak p-4 text-center">
        {children}
        <div className="absolute bottom-0 left-1/2 aspect-square w-3 -translate-x-1/2 translate-y-full bg-surface-weak [clip-path:polygon(50%_100%,0_0,100%_0)]"></div>
      </div>

      <EngduFullNoticeIcon />
    </div>
  );
}

export default EngduHelperCallout;
