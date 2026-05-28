import { useCallback } from 'react';
import { Graphics as PixiGraphics, Texture } from 'pixi.js';

interface EngduBackViewProps {
  x?: number;
  y?: number;
  characterTexture: Texture;
}

export default function EngduBackView({
  x = 0,
  y = 0,
  characterTexture,
}: EngduBackViewProps) {
  // 1. Draw Native Ellipse Shadow under the chick's feet
  // Exact coordinate centered and sized relative to body based on Figma metadata offsets
  const drawShadow = useCallback((g: PixiGraphics) => {
    g.clear()
      .ellipse(89.5, 230.5, 83.5, 26.5) // Center X: 89.5, Center Y: 230.5, Radius X: 83.5, Radius Y: 26.5
      .fill({ color: 0x000000, alpha: 0.15 });
  }, []);

  return (
    <pixiContainer x={x} y={y}>
      {/* 1. PixiJS Native Vector Shadow (For infinite crispness and interactive scaling/alpha animations) */}
      <pixiGraphics draw={drawShadow} />

      {/* 2. High-fidelity SVG Character Sprite (Exactly 173.246 x 240 as designed in Figma) */}
      <pixiSprite
        texture={characterTexture}
        x={0}
        y={0}
        width={173.246}
        height={240}
      />
    </pixiContainer>
  );
}
