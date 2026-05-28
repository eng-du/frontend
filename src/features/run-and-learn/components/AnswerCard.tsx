import { useCallback, useMemo } from 'react';
import { Graphics as PixiGraphics, Texture, TextStyle } from 'pixi.js';
import Door from './Door';

interface AnswerCardProps {
  x: number;
  y: number;
  label: string;
  keyholeTexture: Texture;
  showDivider?: boolean; // Draws a vertical division line on the right edge of color #9e5c36
  corner?: 'left' | 'right' | 'middle'; // Specifies top corner rounding ('left' for first card, 'right' for last card)
}

export default function AnswerCard({
  x,
  y,
  label,
  keyholeTexture,
  showDivider = false,
  corner = 'middle',
}: AnswerCardProps) {
  // 1. Draw Card Background with figma spec:
  // - Left card: top-left corner is rounded by 10px (using arcTo for high performance)
  // - Right card: top-right corner is rounded by 10px
  // - Middle card: all corners sharp (standard rect)
  const drawBg = useCallback((g: PixiGraphics) => {
    g.clear();
    
    if (corner === 'left') {
      g.moveTo(0, 248)
        .lineTo(0, 10)
        .arcTo(0, 0, 10, 0, 10)
        .lineTo(154, 0)
        .lineTo(154, 248)
        .closePath()
        .fill({ color: 0xc79761 });
    } else if (corner === 'right') {
      g.moveTo(0, 248)
        .lineTo(0, 0)
        .lineTo(144, 0)
        .arcTo(154, 0, 154, 10, 10)
        .lineTo(154, 248)
        .closePath()
        .fill({ color: 0xc79761 });
    } else {
      g.rect(0, 0, 154, 248)
        .fill({ color: 0xc79761 });
    }
      
    if (showDivider) {
      g.rect(153, 0, 1, 248)
        .fill({ color: 0x9e5c36 }); // Division line on the right edge
    }
  }, [corner, showDivider]);

  // 2. High-quality Option Text Styles (Synchronized to Figma 32px font size & 48px line height)
  const textStyle = useMemo(() => {
    return new TextStyle({
      fontFamily: 'Pretendard, Inter, Arial, sans-serif',
      fontSize: 32,
      fontWeight: 'bold',
      fill: '#3f230a',
      align: 'center',
      lineHeight: 48,
    });
  }, []);

  return (
    <pixiContainer x={x} y={y}>
      {/* Card Background Graphics with divider */}
      <pixiGraphics draw={drawBg} />

      {/* Answer Label Text - Perfectly centered horizontally using anchor={[0.5, 0]} */}
      <pixiText
        text={label}
        x={77}
        y={10}
        anchor={[0.5, 0]}
        style={textStyle}
      />

      {/* Arched Door Nested Component */}
      <Door
        x={33}
        y={128}
        keyholeTexture={keyholeTexture}
      />
    </pixiContainer>
  );
}
