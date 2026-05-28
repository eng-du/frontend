import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';
import { Application, extend } from '@pixi/react';
import { Container, Sprite, Graphics, Text, Assets, Texture } from 'pixi.js';
import Door from './Door';

// Register PixiJS elements for React v8 JSX declarative rendering
extend({ Container, Sprite, Graphics, Text });

// Keyhole SVGs static imports
import imgPolygon6 from '@/assets/game/door_icon_rhombus.svg';
import imgStar3 from '@/assets/game/door_icon_star.svg';
import imgVector from '@/assets/game/door_icon_heart.svg';

const KEYHOLE_ASSETS = {
  rhombus: imgPolygon6,
  star: imgStar3,
  heart: imgVector,
};

interface DoorLoaderProps {
  keyholeType: keyof typeof KEYHOLE_ASSETS;
}

// A micro preloader component to load the SVG and mount the Door inside a mini Pixi Canvas
function DoorLoader({ keyholeType }: DoorLoaderProps) {
  const [texture, setTexture] = useState<Texture | null>(null);

  useEffect(() => {
    let isDestroyed = false;
    Assets.load(KEYHOLE_ASSETS[keyholeType]).then((tex) => {
      if (!isDestroyed) setTexture(tex);
    });
    return () => {
      isDestroyed = true;
    };
  }, [keyholeType]);

  if (!texture) {
    return (
      <div className="flex items-center justify-center bg-slate-900 border border-slate-800 rounded-xl p-6 w-[200px] h-[200px]">
        <span className="text-12 font-mono text-slate-400 animate-pulse">Loading SVG...</span>
      </div>
    );
  }

  return (
    <Application
      width={200}
      height={200}
      backgroundAlpha={0}
      antialias={true}
    >
      <Door
        x={56} // Center the door within the 200px width (200 - 88) / 2 = 56
        y={40} // Center the door within the 200px height (200 - 120) / 2 = 40
        keyholeTexture={texture}
      />
    </Application>
  );
}

const meta = {
  title: 'Features/RunAndLearn/Components/Door',
  component: DoorLoader,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'PixiJS v8 네이티브 벡터 그래픽스로 그린 아치형 문 바디와 황동 손잡이, 그리고 SVG 포맷으로 불러온 열쇠구멍 문양을 캡슐화한 단독 Door 컴포넌트입니다.',
      },
    },
  },
} satisfies Meta<typeof DoorLoader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const RhombusDoor: Story = {
  name: 'Rhombus Door Option',
  args: {
    keyholeType: 'rhombus',
  },
};

export const StarDoor: Story = {
  name: 'Star Door Option',
  args: {
    keyholeType: 'star',
  },
};

export const HeartDoor: Story = {
  name: 'Heart Door Option',
  args: {
    keyholeType: 'heart',
  },
};
