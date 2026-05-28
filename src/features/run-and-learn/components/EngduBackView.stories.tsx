import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';
import { Application, extend } from '@pixi/react';
import { Container, Sprite, Graphics, Text, Assets, Texture } from 'pixi.js';
import EngduBackView from './EngduBackView';

// Register PixiJS elements for React v8 JSX declarative rendering
extend({ Container, Sprite, Graphics, Text });

// Character SVG static import
import imgEngduBackView from '@/assets/game/engdu-back-view.svg';

// A micro preloader component to load the SVG and mount the EngduBackView inside a mini Pixi Canvas
function EngduBackViewLoader() {
  const [texture, setTexture] = useState<Texture | null>(null);

  useEffect(() => {
    let isDestroyed = false;
    Assets.load(imgEngduBackView).then((tex) => {
      if (!isDestroyed) setTexture(tex);
    });
    return () => {
      isDestroyed = true;
    };
  }, []);

  if (!texture) {
    return (
      <div className="flex flex-col items-center justify-center bg-slate-900 border border-slate-800 rounded-xl p-6 w-[300px] h-[350px]">
        <span className="text-12 font-mono text-slate-400 animate-pulse">Loading Chick SVG...</span>
      </div>
    );
  }

  return (
    <Application
      width={300}
      height={350}
      backgroundAlpha={0}
      antialias={true}
    >
      {/* Background fill to verify overlay and contrast on the grass-colored field */}
      <pixiGraphics draw={(g) => {
        g.clear().rect(0, 0, 300, 350).fill({ color: 0x85cd3b });
      }} />

      <EngduBackView
        x={63} // Center the chick within the 300px width: (300 - 173) / 2 ~ 63
        y={50} // Placed at a comfortable height
        characterTexture={texture}
      />
    </Application>
  );
}

const meta = {
  title: 'Features/RunAndLearn/Components/EngduBackView',
  component: EngduBackViewLoader,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '피그마에서 단일 SVG로 정교하게 결합된 병아리 뒷모습 캐릭터와, 발밑에 네이티브 벡터 그래픽스로 그린 반투명 그림자가 조화롭게 장착된 EngduBackView 독립 검증용 스토리입니다.',
      },
    },
  },
} satisfies Meta<typeof EngduBackViewLoader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'Default Back View with Shadow',
};
