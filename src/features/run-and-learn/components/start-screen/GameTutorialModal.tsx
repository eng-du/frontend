import Modal from '@/components/Modal/Modal';
import TutorialStep from './TutorialStep';
import GameButton from '../common/GameButton';
import GamepadIcon from '@/assets/icons/gamepad.svg?react';

interface GameTutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/** 🎮 런앤런 게임 방법을 팝업 모달 형태로 보여주는 컴포넌트 */
export default function GameTutorialModal({ isOpen, onClose }: GameTutorialModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onCloseHandler={onClose}
      position="absolute"
      className="bg-surface-weak w-120 p-10 overflow-hidden pointer-events-auto"
    >
      <div className="flex flex-col items-center gap-6 w-full">
        {/* 내부 튜토리얼 내용 */}
        <div className="flex flex-col items-start w-full">
          <div className="flex flex-col gap-5 items-start w-full">
            <div className="flex gap-3 items-end">
              <GamepadIcon className="w-12 h-12" />
              <h2 className="font-pinkfong font-normal text-36 text-text-primary m-0">
                게임 방법
              </h2>
            </div>
            <div className="flex flex-col gap-4 items-start w-full">
              <TutorialStep step={1} text="상단에 표시된 문제를 읽어요." />
              <TutorialStep step={2} text="각 문에 적힌 보기 중 정답을 찾아요." />

              <TutorialStep step={3} text="달리는 잉듀를 이동해 정답 문으로 향해요.">
                <li>A 키 또는 &larr; 키 : 왼쪽 이동</li>
                <li>D 키 또는 &rarr; 키 : 오른쪽 이동</li>
              </TutorialStep>

              <TutorialStep step={4} text="정답 문은 통과해 다음 문제로!" />
              <TutorialStep step={5} text="오답 문에 부딪히면 게임이 종료돼요." />
            </div>
          </div>
        </div>

        {/* 닫기 버튼 */}
        <GameButton
          variant="primary"
          size="md"
          onClick={onClose}
          className="w-[180px] h-[54px] text-[24px]"
        >
          닫기
        </GameButton>
      </div>
    </Modal>
  );
}
