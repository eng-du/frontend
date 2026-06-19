import Modal from '@/components/Modal/Modal';
import GameButton from '../common/GameButton';
import { cn } from '@/utils/cn';

interface GameOverModalProps {
  isOpen: boolean;
  correctCount: number;
  onRestart: () => void;
  isMobile?: boolean;
}

/** 🏆 게임오버 시 뜨는 핑크퐁 디자인의 모달 팝업 */
export default function GameOverModal({
  isOpen,
  correctCount,
  onRestart,
  isMobile = false,
}: GameOverModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onCloseHandler={() => { }} // 빈 함수로 백드롭/ESC 닫기 차단
      position="absolute"
      className={cn(
        "bg-[#FDF8ED] max-w-[calc(100%-32px)] overflow-hidden pointer-events-auto",
        isMobile ? "w-[280px] p-5" : "w-[560px] p-10"
      )}
    >
      <div className={cn(
        "flex flex-col items-center justify-center w-full",
        isMobile ? "gap-5" : "gap-7"
      )}>
        <p
          className={cn(
            "font-pinkfong font-bold text-text-danger tracking-[4px] text-center select-none m-0 leading-[1.2]",
            isMobile
              ? "text-32 whitespace-normal"
              : "text-80 tracking-[8px] whitespace-nowrap leading-none"
          )}
        >
          {isMobile ? (
            <>
              GAME<br />OVER!
            </>
          ) : (
            "GAME OVER!"
          )}
        </p>
        <p className={cn(
          "font-pinkfong font-bold text-text-primary text-center select-none m-0 leading-none",
          isMobile ? "text-20 mt-1" : "text-32 mt-2"
        )}>
          이번 점수: {correctCount * 10}점
        </p>
        <GameButton
          onClick={onRestart}
          className={isMobile ? "mt-3" : "mt-6"}
          size={isMobile ? "sm" : "md"}
        >
          재도전
        </GameButton>
      </div>
    </Modal>
  );
}
