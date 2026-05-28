import { useEffect, useState, useCallback } from 'react';
import { Application, extend } from '@pixi/react';
import { Container, Sprite, Graphics, Text, Assets, Texture, Graphics as PixiGraphics } from 'pixi.js';
import AnswerCard from './AnswerCard';
import EngduBackView from './EngduBackView';

// 1. Register PixiJS elements for React v8 JSX declarative rendering
extend({ Container, Sprite, Graphics, Text });

// Static Imports of local SVG Assets under src/assets/game/ (Exactly 11 Master Components)
import imgShadowRock from '@/assets/game/shadow_rock.svg';
import imgShadowFlower from '@/assets/game/shadow_flower.svg';
import imgRockLeft from '@/assets/game/rock_left.svg';
import imgRockRight from '@/assets/game/rock_right.svg';
import imgFlower from '@/assets/game/flower.svg';
import imgCloudLarge from '@/assets/game/cloud_large.svg';
import imgCloudSmall from '@/assets/game/cloud_small.svg';
import imgPolygon6 from '@/assets/game/door_icon_rhombus.svg';
import imgStar3 from '@/assets/game/door_icon_star.svg';
import imgVector from '@/assets/game/door_icon_heart.svg';
import imgEngduBackView from '@/assets/game/engdu-back-view.svg';

const ASSETS = {
  imgShadowRock,
  imgShadowFlower,
  imgRockLeft,
  imgRockRight,
  imgFlower,
  imgCloudLarge,
  imgCloudSmall,
  imgPolygon6,
  imgStar3,
  imgVector,
  imgEngduBackView,
};

export default function GameScene() {
  const [textures, setTextures] = useState<Record<string, Texture> | null>(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  // 2. Preload Master SVG Assets using PixiJS Assets Manager inside a React hook
  useEffect(() => {
    let isDestroyed = false;

    const loadAssets = async () => {
      const assetKeys = Object.keys(ASSETS);
      const loaded: Record<string, Texture> = {};

      for (let i = 0; i < assetKeys.length; i++) {
        const key = assetKeys[i];
        const url = ASSETS[key as keyof typeof ASSETS];
        loaded[key] = await Assets.load(url);

        if (isDestroyed) return;

        setProgress(Math.round(((i + 1) / assetKeys.length) * 100));
      }

      setTextures(loaded);
      setLoading(false);
    };

    loadAssets();

    return () => {
      isDestroyed = true;
    };
  }, []);

  // --- MEMOIZED GRAPHICS DRAW CALLBACKS ---

  // A. Sky & Grass Background
  const drawBg = useCallback((g: PixiGraphics) => {
    g.clear();
    // Sky: light blue (#bdf0ff)
    g.rect(0, 0, 1240, 450).fill({ color: 0xbdf0ff });
    // Grass: light green (#b6ea82)
    g.rect(0, 450, 1240, 440).fill({ color: 0xb6ea82 });
  }, []);

  // B. Perspective Sandy Road (Trapezoid Sandy Path)
  const drawRoad = useCallback((g: PixiGraphics) => {
    g.clear();
    g.drawPolygon([
      388, 450,    // Top-left
      850, 450,    // Top-right
      1240, 890,   // Bottom-right
      0, 890       // Bottom-left
    ]).fill({ color: 0xe6b485 });
  }, []);

  // 3. Loading State UI
  if (loading || !textures) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/90 backdrop-blur-sm z-50">
        <div className="relative flex items-center justify-center mb-4">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-indigo-500 border-r-indigo-500 border-b-slate-700 border-l-slate-700"></div>
          <span className="absolute text-12 font-bold font-mono text-indigo-400">{progress}%</span>
        </div>
        <span className="text-14 font-medium text-slate-300 font-sans tracking-wide">
          인게임 구성 자산들을 로딩하는 중...
        </span>
      </div>
    );
  }

  // 4. Fully Declarative React-Pixi Game Scene Canvas
  return (
    <Application
      width={1240}
      height={890}
      backgroundAlpha={0}
      antialias={true}
      autoDensity={true}
      resolution={window.devicePixelRatio || 1}
    >
      {/* Background (Sky & Grass) */}
      <pixiGraphics draw={drawBg} />

      {/* Sandy Pathway Road */}
      <pixiGraphics draw={drawRoad} />

      {/* ☁️ Floating Ambient Clouds */}
      <pixiSprite texture={textures.imgCloudLarge} x={131} y={76} width={204} height={116} />
      <pixiSprite texture={textures.imgCloudLarge} x={913} y={248} width={204} height={116} />
      <pixiSprite texture={textures.imgCloudSmall} x={67} y={346} width={100} height={45} />
      <pixiSprite texture={textures.imgCloudSmall} x={1095} y={90} width={100} height={45} />

      {/* ⛰️ Shadows for Scenery elements */}
      <pixiSprite texture={textures.imgShadowRock} x={82} y={498} width={178} height={66} />
      <pixiSprite texture={textures.imgShadowRock} x={1022} y={539} width={178} height={66} />
      <pixiSprite texture={textures.imgShadowFlower} x={42} y={657} width={80} height={30} />
      <pixiSprite texture={textures.imgShadowFlower} x={991} y={474} width={80} height={30} />
      <pixiSprite texture={textures.imgShadowFlower} x={1137} y={681} width={80} height={30} />

      {/* 🪨 Environment Rocks */}
      <pixiSprite texture={textures.imgRockRight} x={1038.86} y={478} width={146} height={103} />
      <pixiSprite texture={textures.imgRockLeft} x={99} y={468} width={138.86} height={82.765} />

      {/* 🌸 Green Flowers in Pots */}
      <pixiSprite texture={textures.imgFlower} x={62} y={591} width={60} height={81} />
      <pixiSprite texture={textures.imgFlower} x={1137} y={616} width={60} height={81} />
      <pixiSprite texture={textures.imgFlower} x={985} y={403} width={60} height={81} />

      {/* 🚪 Option Answer Cards (Borderless cards with dividers and top rounding) */}
      <AnswerCard
        x={388}
        y={202}
        label={"A1.\n안녕"}
        keyholeTexture={textures.imgPolygon6}
        corner="left"
        showDivider={true}
      />

      <AnswerCard
        x={542}
        y={202}
        label={"A2.\n잘자"}
        keyholeTexture={textures.imgStar3}
        corner="middle"
        showDivider={true}
      />

      <AnswerCard
        x={696}
        y={202}
        label={"A3.\n배고파"}
        keyholeTexture={textures.imgVector}
        corner="right"
        showDivider={false}
      />

      {/* 🐥 Cute Playable Chick Character (Combines native vector shadow & unified SVG Sprite) */}
      <EngduBackView
        x={553}
        y={577}
        characterTexture={textures.imgEngduBackView}
      />
    </Application>
  );
}
