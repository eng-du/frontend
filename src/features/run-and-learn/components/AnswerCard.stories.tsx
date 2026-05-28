import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';
import { Application, extend } from '@pixi/react';
import { Container, Sprite, Graphics, Text, Assets, Texture } from 'pixi.js';
import AnswerCard from './AnswerCard';

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

interface AnswerCardLoaderProps {
  label: string;
  keyholeType: keyof typeof KEYHOLE_ASSETS;
  corner?: 'left' | 'right' | 'middle';
  showDivider?: boolean;
}

// A micro preloader component to load the SVG and mount the AnswerCard inside a mini Pixi Canvas
function AnswerCardLoader({ label, keyholeType, corner = 'middle', showDivider = false }: AnswerCardLoaderProps) {
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
      <div className="flex items-center justify-center bg-slate-900 border border-slate-800 rounded-xl p-6 w-[250px] h-[300px]">
        <span className="text-12 font-mono text-slate-400 animate-pulse">Loading SVG...</span>
      </div>
    );
  }

  return (
    <Application
      width={250}
      height={300}
      backgroundAlpha={0}
      antialias={true}
    >
      <AnswerCard
        x={48} // Center the card within the 250px width (250 - 154) / 2 = 48
        y={26} // Center the card within the 300px height (300 - 248) / 2 = 26
        label={label}
        keyholeTexture={texture}
        corner={corner}
        showDivider={showDivider}
      />
    </Application>
  );
}

const meta = {
  title: 'Features/RunAndLearn/Components/AnswerCard',
  component: AnswerCardLoader,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '정답 선택 목재 카드 바디와 커스텀 다국어 텍스트 라벨, 그리고 내부에 장착된 아치형 Door 컴포넌트 조합을 검증하는 AnswerCard 단독 컴포넌트입니다.',
      },
    },
  },
} satisfies Meta<typeof AnswerCardLoader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultRhombus: Story = {
  name: 'Option A1 (Rhombus - Left Round Corner)',
  args: {
    label: "A1.\n안녕",
    keyholeType: 'rhombus',
    corner: 'left',
    showDivider: true,
  },
};

export const DefaultStar: Story = {
  name: 'Option A2 (Star - Middle Sharp)',
  args: {
    label: "A2.\n잘자",
    keyholeType: 'star',
    corner: 'middle',
    showDivider: true,
  },
};

export const DefaultHeart: Story = {
  name: 'Option A3 (Heart - Right Round Corner)',
  args: {
    label: "A3.\n배고파",
    keyholeType: 'heart',
    corner: 'right',
    showDivider: false,
  },
};
