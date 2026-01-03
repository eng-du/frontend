import { useWindowSize } from '@/hooks/useWindowSize';
import Confetti from 'react-confetti';
import { createPortal } from 'react-dom';

function ConfettiEffect() {
  const { width, height } = useWindowSize();
  const root = document.getElementById('root');
  if (!root) return null;

  return createPortal(
    <Confetti
      width={width}
      height={height}
      numberOfPieces={120}
      recycle={false}
      gravity={0.5}
      tweenDuration={1000}
      style={{
        zIndex: 9999,
      }}
    />,
    root,
  );
}

export default ConfettiEffect;
