import EngduFullStudyIcon from '@/assets/icons/engdu-full-study.svg?react';
import type { ReactNode } from 'react';
import Callout from './Callout';

interface EngduStudyCalloutProps {
  children: ReactNode;
  onClickHandler?: () => void;
}

function EngduStudyCallout({ children, onClickHandler }: EngduStudyCalloutProps) {
  return (
    <Callout
      Icon={EngduFullStudyIcon}
      onClickHandler={onClickHandler}
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      {children}
    </Callout>
  );
}

export default EngduStudyCallout;
