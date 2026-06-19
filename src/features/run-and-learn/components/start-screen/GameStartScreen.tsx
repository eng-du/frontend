import { useEffect, useRef, useState } from 'react';
import { cn } from '@/utils/cn';
import StartTitle from './StartTitle';
import StartScenery from './StartScenery';
import StartButton from './StartButton';
import GameButton from '../common/GameButton';
import GameTutorialModal from './GameTutorialModal';

interface GameStartScreenProps {
  onStart: () => void;
  isLoading?: boolean;
}

export default function GameStartScreen({ onStart, isLoading = false }: GameStartScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      const aspect = width / height;
      const mobile = aspect < 1.2;
      setIsMobile(mobile);

      if (mobile) {
        // 모바일(세로 카드 모드): 327 x 592 피그마 규격 기준
        // 높이에 맞추고 좌우는 클리핑 (부모 aspect가 327:592이므로 사실상 꽉 참)
        const scaleY = height / 592;
        setScale(scaleY);
      } else {
        // PC/태블릿: 1240 x 890 피그마 규격 기준
        const scaleX = width / 1240;
        const scaleY = height / 890;
        setScale(Math.min(scaleX, scaleY));
      }
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    // 컨테이너: 부모를 꽉 채움
    <div ref={containerRef} className="absolute inset-0 overflow-hidden z-20">
      {/* 피그마 프레임 크기에 맞춰 배치 후 scale로 비율 조정 */}
      <div
        className={cn(
          "absolute left-1/2 top-1/2 bg-[#d6f3ff] overflow-hidden",
          isMobile ? "w-[327px] h-[592px]" : "w-[1240px] h-[890px]"
        )}
        style={{ 
          transform: `translate(-50%, -50%) scale(${scale})`,
          transformOrigin: 'center center'
        }}
      >
        <div className={cn(
          "flex flex-col items-center justify-between h-full pt-10",
          isMobile ? "pt-0" : "pt-10"
        )}>
          <StartTitle isMobile={isMobile} />
          
          <div className="flex flex-row gap-4 items-center justify-center z-30">
            <GameButton
              variant="secondary"
              size="md"
              onClick={() => setIsTutorialOpen(true)}
            >
              게임 방법
            </GameButton>
            <StartButton onStart={onStart} isLoading={isLoading} />
          </div>
          
          <StartScenery isMobile={isMobile} />
        </div>

        {/* 게임 방법 설명 모달 */}
        <GameTutorialModal
          isOpen={isTutorialOpen}
          onClose={() => setIsTutorialOpen(false)}
        />
      </div>
    </div>
  );
}
