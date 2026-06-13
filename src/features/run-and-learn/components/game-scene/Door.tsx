import { useMemo, useRef } from 'react';
import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface DoorProps {
  position?: [number, number, number];
  keyholeTextureUrl: string; // SVG path
  isCorrect?: boolean;
  phase?: string;
}

export default function Door({ 
  position = [0, 0, 0], 
  keyholeTextureUrl,
  isCorrect = false,
  phase = 'PLAYING',
}: DoorProps) {
  // Load SVG texture for the door icon shape (rhombus, heart, star)
  const patternTexture = useTexture(keyholeTextureUrl);
  patternTexture.colorSpace = THREE.SRGBColorSpace;

  // 🚪 Generate clean 3D Vector Shape with an Arched top!
  const doorShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(0, 0.916);
    shape.bezierCurveTo(0, 0.916 + 0.127, 0.197, 1.20, 0.44, 1.20);
    shape.bezierCurveTo(0.683, 1.20, 0.88, 0.916 + 0.127, 0.88, 0.916);
    shape.lineTo(0.88, 0);
    shape.closePath();
    return shape;
  }, []);

  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      if (isCorrect && phase === 'CORRECT_PASSING') {
        // 정답 문: 멈춤 현상을 방지하기 위해 1프레임 만에 즉시 scale 0으로 소멸!
        groupRef.current.scale.set(0, 0, 0);
      } else if (phase === 'PLAYING') {
        // NEXT → PLAYING 전환 시 즉시 scale 1 복원
        groupRef.current.scale.set(1, 1, 1);
      } else {
        // 그 외 상태(CORRECT_PASSING 중 오답 문 등)는 현재 scale 유지
        groupRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 15 * delta);
      }
    }
  });

  return (
    <group position={position}>
      {/* Door Frame & Body group */}
      <group ref={groupRef}>
        {/* A. Arched Door Base Mesh */}
        <mesh>
          <shapeGeometry args={[doorShape]} />
          <meshBasicMaterial color="#9e5c36" side={THREE.DoubleSide} />
        </mesh>

        {/* B. Gold/Brass Door Handle Knob */}
        <mesh position={[0.73, 0.55, 0.005]}>
          <circleGeometry args={[0.045, 32]} />
          <meshBasicMaterial color="#D5A15F" side={THREE.DoubleSide} />
        </mesh>

        {/* C. SVG Pattern Overlay */}
        <mesh position={[0.44, 0.825, 0.005]}>
          <planeGeometry args={[0.45, 0.45]} />
          <meshBasicMaterial
            map={patternTexture}
            transparent
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      </group>
    </group>
  );
}
