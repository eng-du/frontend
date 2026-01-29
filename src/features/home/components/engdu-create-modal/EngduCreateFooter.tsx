import Button from '@/components/Button';
import type { EngduType } from '@/types/engdu';
import { createEngdu } from '@/api/engdu';
import { useNavigate } from 'react-router';

interface EngduCreateFooterProps {
  selectedEngduType: EngduType;
  topic: string;
  onCloseHandler: () => void;
}

function EngduCreateFooter({ selectedEngduType, topic, onCloseHandler }: EngduCreateFooterProps) {
  const navigate = useNavigate();

  const handleCreateEngdu = async () => {
    // TODO: 닌이도 기능 구현 시 난이도 추가
    try {
      const { engduId } = await createEngdu({ topic, level: 'BEGINNER' });
      onCloseHandler();
      navigate(`/learning/${engduId}`);
    } catch (error) {
      // TODO: 사용자에게 에러 알림 처리
    }
  };

  return (
    <div className="flex gap-3">
      <Button type="primary" style="ghost" onClickHandler={onCloseHandler}>
        취소
      </Button>
      <Button
        type="primary"
        style="fill"
        disabled={!selectedEngduType || !topic}
        onClickHandler={handleCreateEngdu}
      >
        생성
      </Button>
    </div>
  );
}

export default EngduCreateFooter;
