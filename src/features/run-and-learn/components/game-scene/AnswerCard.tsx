import { useMemo } from 'react';
import { Text } from '@react-three/drei';
import * as THREE from 'three';
import Door from './Door';

interface AnswerCardProps {
  position?: [number, number, number];
  scale?: number;
  keyholeTextureUrl: string;
  corner?: 'left' | 'right' | 'middle';
  showDivider?: boolean;
  optionText?: string;
  isCorrect?: boolean;
  phase?: string;
}

export default function AnswerCard({
  position = [0, 0, 0],
  scale = 1.0,
  keyholeTextureUrl,
  corner = 'middle',
  showDivider = false,
  optionText = '',
  isCorrect = false,
  phase = 'PLAYING',
}: AnswerCardProps) {

  // 1. Generate clean 3D Vector Shape with a physical Door Hole punched in it!
  const cardShape = useMemo(() => {
    const shape = new THREE.Shape();

    // --- Outer Card Boundary (width = 1.54, height = 2.48) ---
    shape.moveTo(0, 0);
    shape.lineTo(1.54, 0);

    // Top-Right corner rounding if rightmost card
    if (corner === 'right') {
      shape.lineTo(1.54, 2.38);
      shape.quadraticCurveTo(1.54, 2.48, 1.44, 2.48);
    } else {
      shape.lineTo(1.54, 2.48);
    }

    // Top-Left corner rounding if leftmost card
    if (corner === 'left') {
      shape.lineTo(0.10, 2.48);
      shape.quadraticCurveTo(0, 2.48, 0, 2.38);
    } else {
      shape.lineTo(0, 2.48);
    }

    shape.closePath();

    // --- Inner Door Hole Cutout (width = 0.88, height = 1.20, x=0.33, y=0.0) ---
    // Path must be drawn in the OPPOSITE direction (clockwise) to instruct Three.js to punch a hole!
    const hole = new THREE.Path();

    hole.moveTo(0.33, 0);
    hole.lineTo(0.33, 0.916);

    // Door arch using a quadratic/bezier curve
    hole.bezierCurveTo(0.33, 0.916 + 0.127, 0.33 + 0.197, 1.20, 0.33 + 0.44, 1.20);
    hole.bezierCurveTo(0.33 + 0.683, 1.20, 0.33 + 0.88, 0.916 + 0.127, 0.33 + 0.88, 0.916);

    hole.lineTo(0.33 + 0.88, 0);
    hole.closePath();

    // Punch the hole into our main card shape!
    shape.holes.push(hole);

    return shape;
  }, [corner]);

  return (
    <group position={position} scale={[scale, scale, 1]}>
      {/* 1. Main Vector Card Frame with punched hole */}
      <mesh>
        <shapeGeometry args={[cardShape]} />
        {/* Matches original Pixi color #c79761 */}
        <meshBasicMaterial color="#c79761" side={THREE.DoubleSide} />
      </mesh>

      {/* 2. Optional Right edge vertical divider line (Figma #9e5c36, width 0.01) */}
      {showDivider && (
        <mesh position={[1.535, 1.24, 0.001]}>
          <planeGeometry args={[0.01, 2.48]} />
          <meshBasicMaterial color="#9e5c36" />
        </mesh>
      )}

      {/* 3. Nest the Door Component exactly inside the punched out space (x=0.33, y=0.0) */}
      {/* Slightly offset forward on Z (0.002) to avoid Z-fighting with card plane */}
      <Door
        position={[0.33, 0, 0.002]}
        keyholeTextureUrl={keyholeTextureUrl}
        isCorrect={isCorrect}
        phase={phase}
      />

      {/* 4. Option Text (3D) on the Card Frame (above the door) */}
      {optionText && (
        <Text
          font="/PinkfongBabySharkFont_Bold.woff"
          position={[0.77, 1.8, 0.01]} // Centered horizontally (1.54/2), placed vertically in the upper solid part
          fontSize={0.25}
          color="#333333"
          anchorX="center"
          anchorY="middle"
          maxWidth={1.4}
          textAlign="center"
        >
          {optionText}
        </Text>
      )}
    </group>
  );
}
