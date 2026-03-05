import Button from '@/components/Button/Button';
import type { EngduType } from '@/types/engdu';
import { postEngdu } from '@/api/engdu';
import { useNavigate } from 'react-router';
import { trackEvent } from '@/utils/analytics';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

interface EngduCreateFooterProps {
  selectedEngduType: EngduType;
  topic: string;
  onCloseHandler: () => void;
}

function EngduCreateFooter({ selectedEngduType, topic, onCloseHandler }: EngduCreateFooterProps) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: postEngduMutate, isPending: isCreating } = useMutation({
    mutationFn: postEngdu,
    onSuccess: (response) => {
      const engduId = response.engduId;
      queryClient.invalidateQueries({ queryKey: ['engdu', 'engdus'] });
      onCloseHandler();
      navigate(`/learning/${engduId}`);
    },
    onError: () => {
      toast.error('잉듀 생성 중 오류가 발생했습니다.');
    },
  });

  const handleCreateEngdu = () => {
    trackEvent('engdu_create_click', {
      engdu_type: selectedEngduType,
      topic_length: topic.length,
    });
    postEngduMutate({ topic, level: 'BEGINNER' });
  };

  return (
    <div className="flex gap-3">
      <Button variant="primary" appearance="ghost" onClickHandler={onCloseHandler}>
        취소
      </Button>
      <Button
        variant="primary"
        appearance="fill"
        disabled={!selectedEngduType || !topic || isCreating}
        onClickHandler={handleCreateEngdu}
      >
        생성
      </Button>
    </div>
  );
}

export default EngduCreateFooter;
