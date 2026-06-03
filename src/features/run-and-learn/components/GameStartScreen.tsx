import { useEffect, useRef, useState } from 'react';
import StartTitle from './StartTitle';
import StartScenery from './StartScenery';
import StartButton from './StartButton';

// 피그마 기준 해상도
const BASE_WIDTH = 1240;
const BASE_HEIGHT = 890;

interface GameStartScreenProps {
  onStart: () => void;
  isLoading?: boolean;
}

export default function GameStartScreen({ onStart, isLoading = false }: GameStartScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      const scaleX = width / BASE_WIDTH;
      const scaleY = height / BASE_HEIGHT;
      setScale(Math.min(scaleX, scaleY));
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    // 컨테이너: 부모(aspect-[1240/890])를 꽉 채움
    <div ref={containerRef} className="absolute inset-0 overflow-hidden z-20">
      {/* 1240×890 고정 설계, scale로 통째로 축소 (동적 값이므로 style 허용) */}
      <div
        className="absolute w-[1240px] h-[890px] origin-top-left bg-[#d6f3ff] overflow-hidden"
        style={{ transform: `scale(${scale})` }}
      >
        {/*
          피그마 최상위 구조: flex-col, justify-between, items-center, pt-[40px]
          ├── StartTitle  (상단 타이틀+설명)
          ├── StartButton (중앙 버튼)
          └── StartScenery (하단 씬 배경)
        */}
        <div className="flex flex-col items-center justify-between h-full pt-10">
          <StartTitle />
          <StartButton onStart={onStart} isLoading={isLoading} />
          <StartScenery />
        </div>
      </div>
    </div>
  );
}
