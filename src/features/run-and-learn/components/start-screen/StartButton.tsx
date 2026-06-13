import GameButton from '../common/GameButton';

interface StartButtonProps {
  onStart: () => void;
  isLoading?: boolean;
}

export default function StartButton({ onStart, isLoading = false }: StartButtonProps) {
  return (
    <GameButton
      onClick={onStart}
      isLoading={isLoading}
      size="lg"
    >
      {isLoading ? '로딩 중...' : 'START!'}
    </GameButton>
  );
}
