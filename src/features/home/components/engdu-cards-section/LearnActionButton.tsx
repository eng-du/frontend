import Button from '@/components/Button/Button';
import RetryIcon from '@/assets/icons/rotate-ccw.svg?react';
import PlayIcon from '@/assets/icons/play.svg?react';
import { Link } from 'react-router';

interface LearnActionButtonProps {
  engduId: number;
  progress: number;
}

function LearnActionButton({ engduId, progress }: LearnActionButtonProps) {
  return (
    <Link to={`/learning/${engduId}`} className='w-full'>
      <Button>
        {progress === 100 ? <RetryIcon /> : <PlayIcon />}
        <div>{progress === 100 ? '다시' : '이어서'} 학습하기</div>
      </Button>
    </Link>
  );
}

export default LearnActionButton;
