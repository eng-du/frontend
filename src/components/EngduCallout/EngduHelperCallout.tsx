import EngduFullNoticeIcon from '@/assets/icons/engdu-full-notice.svg?react';
import type { ReactNode } from 'react';
import EngduCallout from './EngduCallout';

interface EngduHelperCalloutProps {
  children: ReactNode;
  onClickHandler?: () => void;
}

function EngduHelperCallout({ children, onClickHandler }: EngduHelperCalloutProps) {
  return (
    <EngduCallout
      Icon={EngduFullNoticeIcon}
      onClickHandler={onClickHandler}
      className="absolute right-0 bottom-0 hidden translate-x-[calc(100%+20px)] lg:flex"
    >
      {children}
    </EngduCallout>
  );
}

export default EngduHelperCallout;
