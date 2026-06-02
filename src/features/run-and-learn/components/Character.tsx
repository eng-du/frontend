import { Billboard, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import imgEngduBackView from '@/assets/game/engdu-back-view.svg';

interface CharacterProps {
  position?: [number, number, number];
  targetX?: number;
}

export default function Character({ 
  position = [0, -1.19, 0.5], 
  targetX = 0.0 
}: CharacterProps) {
  // Load character SVG texture
  const characterTexture = useTexture(imgEngduBackView);
  characterTexture.colorSpace = THREE.SRGBColorSpace;

  return (
    <group position={[targetX, position[1], position[2]]}>
      {/* 1. Foot Shadow (Smooth, crisp vector ellipse shadow using CircleGeometry scale deformation) */}
      <mesh position={[0, 0.005, 0]} rotation={[-Math.PI / 2, 0, 0]} scale={[0.8, 0.6, 1.0]}>
        <circleGeometry args={[0.44, 64]} />
        <meshBasicMaterial
          color="#000000"
          transparent
          opacity={0.16}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* 2. Cute Chick Character scaled down by 50% (Billboard facing the camera) */}
      {/* Width: 1.36 -> 0.68, Height: 1.88 -> 0.94. Billboard centered at Y = height / 2 = 0.47 */}
      <Billboard position={[0, 0.47, 0]}>
        <mesh>
          <planeGeometry args={[0.68, 0.94]} />
          <meshBasicMaterial
            map={characterTexture}
            transparent
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      </Billboard>
    </group>
  );
}
