import Button from '@/components/Button/Button';
import Modal from '@/components/Modal/Modal';

interface WithdrawModalProps {
  isOpen: boolean;
  onClose: () => void;
  onWithdraw: () => void;
}

function WithdrawModal({ isOpen, onClose, onWithdraw }: WithdrawModalProps) {
  return (
    <Modal isOpen={isOpen} onCloseHandler={onClose}>
      <div className="flex w-90 flex-col items-center gap-8 p-8">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-center text-24 font-bold text-text-primary">정말 탈퇴하시겠어요?</h1>
          <p className="text-center whitespace-pre-line text-text-secondary">
            탈퇴하시면 모든 학습 기록과 데이터가{'\n'}
            삭제되며 <span className="font-bold text-text-danger">복구할 수 없습니다.</span>
          </p>
        </div>

        <div className="flex w-full flex-col gap-3">
          <Button onClickHandler={onWithdraw} className="bg-text-danger">
            탈퇴하기
          </Button>
          <Button onClickHandler={onClose} appearance="ghost">
            더 써볼래요
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default WithdrawModal;
