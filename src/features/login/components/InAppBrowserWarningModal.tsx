import Button from '@/components/Button/Button';
import Modal from '@/components/Modal/Modal';
import { copyToClipboard } from '@/utils/browser';
import { toast } from 'sonner';

interface InAppBrowserWarningModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function InAppBrowserWarningModal({
  isOpen,
  onClose,
}: InAppBrowserWarningModalProps) {
  const handleCopyLink = async () => {
    const currentUrl = window.location.href;
    await copyToClipboard(currentUrl);
    toast('링크가 복사되었습니다.');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onCloseHandler={onClose}>
      <div className="flex h-fit w-80 flex-col items-center gap-6 p-6 text-center">
        <div className="flex flex-col gap-2">
          <h2 className="text-18 font-bold text-text-primary">
            구글 로그인을
            <br /> 지원하지 않는 브라우저입니다
          </h2>
          <p className="text-14 whitespace-pre-wrap text-text-secondary">
            다른 브라우저(크롬, 사파리)를 이용해주세요.
          </p>
        </div>
        <div className="flex w-full flex-col gap-3">
          <Button variant="primary" appearance="fill" onClickHandler={handleCopyLink}>
            현재 링크 복사하기
          </Button>
          <p className="text-12 text-text-secondary">
            복사한 링크를 인터넷 브라우저 주소창에 붙여넣어 주세요.
          </p>
        </div>
      </div>
    </Modal>
  );
}
