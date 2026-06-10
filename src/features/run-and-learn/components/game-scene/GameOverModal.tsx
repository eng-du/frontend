import Modal from '@/components/Modal/Modal';
import GameButton from '../common/GameButton';

interface GameOverModalProps {
  isOpen: boolean;
  correctCount: number;
  onRestart: () => void;
}

/** 🏆 게임오버 시 뜨는 핑크퐁 디자인의 모달 팝업 */
export default function GameOverModal({ isOpen, correctCount, onRestart }: GameOverModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onCloseHandler={() => { }} // 빈 함수로 백드롭/ESC 닫기 차단
      position="absolute"
      className="bg-[#FDF8ED] px-15 py-10 overflow-hidden pointer-events-auto"
    >
      <div className="flex flex-col gap-7 items-center justify-center w-full">
        <p
          className="font-pinkfong font-bold text-80 text-text-danger tracking-[8px] text-center select-none m-0 leading-none whitespace-nowrap"
        >
          GAME OVER!
        </p>
        <p className="font-pinkfong font-bold text-32 text-text-primary text-center select-none m-0 leading-none mt-2">
          이번 점수: {correctCount * 10}점
        </p>
        <GameButton
          onClick={onRestart}
          className="mt-6"
          size="md"
        >
          재도전
        </GameButton>
      </div>
    </Modal>
  );
}
