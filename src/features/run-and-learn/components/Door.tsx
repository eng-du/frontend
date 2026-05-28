import { useCallback } from 'react';
import { Graphics as PixiGraphics, Texture } from 'pixi.js';

interface DoorProps {
  x?: number;
  y?: number;
  keyholeTexture: Texture;
}

export default function Door({
  x = 0,
  y = 0,
  keyholeTexture,
}: DoorProps) {
  // 1. Draw Door Base (Arched top wood block: width=88, height=120) - NO BORDER/STROKE
  // Exact Figma Path: M44 0C68.3005 0 88 12.7137 88 28.3969V120H0V28.3969C0 12.7137 19.6995 0 44 0Z
  const drawDoorBase = useCallback((g: PixiGraphics) => {
    g.clear()
      .moveTo(44, 0)
      .bezierCurveTo(68.3005, 0, 88, 12.7137, 88, 28.3969)
      .lineTo(88, 120)
      .lineTo(0, 120)
      .lineTo(0, 28.3969)
      .bezierCurveTo(0, 12.7137, 19.6995, 0, 44, 0)
      .closePath()
      .fill({ color: 0x9e5c36 });       // FILL ONLY, NO STROKE
  }, []);

  // 2. Draw Door Handle Knob (Warm gold/brass circle, NO BORDER/STROKE)
  // Position relative to door container: Center X=73, Center Y=65, Radius=5
  const drawHandle = useCallback((g: PixiGraphics) => {
    g.clear()
      .circle(73, 65, 5)
      .fill({ color: 0xD5A15F });       // Fill with #D5A15F
  }, []);

  return (
    <pixiContainer x={x} y={y}>
      {/* Door Base Arched Graphics */}
      <pixiGraphics draw={drawDoorBase} />

      {/* Gold Door Handle Graphics */}
      <pixiGraphics draw={drawHandle} />

      {/* SVG Keyhole Sprite (Exactly x=21.5, y=15, size 45x45 centered inside the door) */}
      <pixiSprite
        texture={keyholeTexture}
        x={21.5}
        y={15}
        width={45}
        height={45}
      />
    </pixiContainer>
  );
}
