import Button from '@/components/Button/Button';
import type { EngduType } from '@/types/engdu';
import { postEngdu } from '@/api/engdu';
import { useNavigate } from 'react-router';

interface EngduCreateFooterProps {
  selectedEngduType: EngduType;
  topic: string;
  onCloseHandler: () => void;
}

function EngduCreateFooter({ selectedEngduType, topic, onCloseHandler }: EngduCreateFooterProps) {
  const navigate = useNavigate();

  const handleCreateEngdu = async () => {
    try {
      const response = await postEngdu({ topic, level: 'BEGINNER' });
      const engduId = (response as any).engduId; // Using any for now to match user's hint if type mismatch
      onCloseHandler();
      navigate(`/learning/${engduId}`);
    } catch {
      alert('잉듀 생성 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="flex gap-3">
      <Button variant="primary" appearance="ghost" onClickHandler={onCloseHandler}>
        취소
      </Button>
      <Button
        variant="primary"
        appearance="fill"
        disabled={!selectedEngduType || !topic}
        onClickHandler={handleCreateEngdu}
      >
        생성
      </Button>
    </div>
  );
}

export default EngduCreateFooter;
