import Button from '@/components/Button';
import RetryIcon from '@/assets/icons/rotate-ccw.svg?react';
import PlayIcon from '@/assets/icons/play.svg?react';

interface LearnActionButtonProps {
  progress: number;
}

function LearnActionButton({ progress }: LearnActionButtonProps) {
  return (
    <Button>
      {progress === 100 ? <RetryIcon /> : <PlayIcon />}
      <div>{progress === 100 ? '다시' : '이어서'} 학습하기</div>
    </Button>
  );
}

export default LearnActionButton;
