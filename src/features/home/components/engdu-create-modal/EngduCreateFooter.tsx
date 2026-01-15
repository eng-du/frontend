import Button from '@/components/Button';
import type { EngduType } from '@/types/engdu';

interface EngduCreateFooterProps {
  selectedEngduType: EngduType;
  topic: string;
  onCloseHandler: () => void;
}

function EngduCreateFooter({ selectedEngduType, topic, onCloseHandler }: EngduCreateFooterProps) {
  return (
    <div className="flex gap-3">
      <Button type="primary" style="ghost" onClickHandler={onCloseHandler}>
        취소
      </Button>
      <Button
        type="primary"
        style="fill"
        disabled={!selectedEngduType || !topic}
        onClickHandler={() => {
          // TODO: 잉듀 생성 API 연결
        }}
      >
        생성
      </Button>
    </div>
  );
}

export default EngduCreateFooter;
