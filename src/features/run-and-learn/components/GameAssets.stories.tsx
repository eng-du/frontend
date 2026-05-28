import type { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';
import { Application, extend } from '@pixi/react';
import { Container, Sprite, Graphics, Text, Assets, Texture } from 'pixi.js';

// Register PixiJS elements for React v8 JSX declarative rendering
extend({ Container, Sprite, Graphics, Text });

// Static Imports of local SVG Assets under src/assets/game/
import imgShadowRock from '@/assets/game/shadow_rock.svg';
import imgShadowFlower from '@/assets/game/shadow_flower.svg';
import imgRockLeft from '@/assets/game/rock_left.svg';
import imgRockRight from '@/assets/game/rock_right.svg';
import imgFlower from '@/assets/game/flower.svg';
import imgCloudLarge from '@/assets/game/cloud_large.svg';
import imgCloudSmall from '@/assets/game/cloud_small.svg';

const ASSETS = {
  cloudLarge: imgCloudLarge,
  cloudSmall: imgCloudSmall,
  flower: imgFlower,
  rockLeft: imgRockLeft,
  rockRight: imgRockRight,
  shadowRock: imgShadowRock,
  shadowFlower: imgShadowFlower,
};

function GameAssetsLoader() {
  const [textures, setTextures] = useState<Record<string, Texture> | null>(null);

  useEffect(() => {
    let isDestroyed = false;
    const load = async () => {
      const loaded: Record<string, Texture> = {};
      for (const [key, url] of Object.entries(ASSETS)) {
        loaded[key] = await Assets.load(url);
      }
      if (!isDestroyed) setTextures(loaded);
    };
    load();
    return () => {
      isDestroyed = true;
    };
  }, []);

  if (!textures) {
    return (
      <div className="flex flex-col items-center justify-center bg-slate-900 border border-slate-800 rounded-xl p-8 w-[800px] h-[400px]">
        <span className="text-14 font-mono text-slate-400 animate-pulse mb-2">Preloading SVG Vector Assets...</span>
        <span className="text-11 text-slate-500 font-sans">Checking flower.svg, clouds, rocks, and shadows...</span>
      </div>
    );
  }

  return (
    <Application
      width={800}
      height={400}
      backgroundAlpha={0}
      antialias={true}
    >
      {/* Background so white clouds and faint shadows are fully visible */}
      <pixiGraphics draw={(g) => {
        g.clear().rect(0, 0, 800, 400).fill({ color: 0x1e293b });
      }} />

      {/* Grid of loaded SVG assets */}
      <pixiContainer x={40} y={40}>
        {/* Large & Small Clouds */}
        <pixiSprite texture={textures.cloudLarge} x={0} y={0} width={150} height={85} />
        <pixiSprite texture={textures.cloudSmall} x={180} y={20} width={80} height={36} />

        {/* Unified Flower & Flower Shadow */}
        <pixiSprite texture={textures.flower} x={320} y={0} width={60} height={81} />
        <pixiSprite texture={textures.shadowFlower} x={320} y={95} width={60} height={22} />

        {/* Environment Rocks & Rock Shadow */}
        <pixiSprite texture={textures.rockLeft} x={0} y={150} width={138.86} height={82.765} />
        <pixiSprite texture={textures.rockRight} x={180} y={150} width={146} height={103} />
        <pixiSprite texture={textures.shadowRock} x={360} y={170} width={146} height={54} />
      </pixiContainer>
    </Application>
  );
}

const meta = {
  title: 'Features/RunAndLearn/Components/GameAssets',
  component: GameAssetsLoader,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '로컬 SVG 벡터 이미지 자산들(구름, 꽃, 돌, 그림자 등 7종)이 PixiJS 렌더러에 의해 올바르게 로드 및 비트맵 캐싱되어 고품질로 표현되는지 확인하는 통합 자산 그리드입니다.',
      },
    },
  },
} satisfies Meta<typeof GameAssetsLoader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: 'SVG Assets Verification Grid',
};
