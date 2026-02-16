import Button from '@/components/Button/Button';
import type { EngduType } from '@/types/engdu';
import { postEngdu } from '@/api/engdu';
import { useNavigate } from 'react-router';
import { trackEvent } from '@/utils/analytics';

interface EngduCreateFooterProps {
  selectedEngduType: EngduType;
  topic: string;
  onCloseHandler: () => void;
}

function EngduCreateFooter({ selectedEngduType, topic, onCloseHandler }: EngduCreateFooterProps) {
  const navigate = useNavigate();

  const handleCreateEngdu = async () => {
    trackEvent('engdu_create_click', {
      engdu_type: selectedEngduType,
      topic_length: topic.length,
    });
    try {
      const response = await postEngdu({ topic, level: 'BEGINNER' });
      const engduId = response.engduId;
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
