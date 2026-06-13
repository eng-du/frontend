import { useRef } from 'react';
import { Billboard, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import imgRun1 from '@/assets/game/engdu-back-run1.svg';
import imgRun2 from '@/assets/game/engdu-back-run2.svg';
import imgWrong from '@/assets/game/engdu-back-wrong.svg';

interface CharacterProps {
  position?: [number, number, number];
  targetX?: number;
  phase?: string;
}

export default function Character({
  position = [0, -1.19, 0.5],
  targetX = 0.0,
  phase
}: CharacterProps) {
  // Load character SVG textures
  const texture1 = useTexture(imgRun1);
  const texture2 = useTexture(imgRun2);
  const textureWrong = useTexture(imgWrong);

  texture1.colorSpace = THREE.SRGBColorSpace;
  texture2.colorSpace = THREE.SRGBColorSpace;
  textureWrong.colorSpace = THREE.SRGBColorSpace;

  const groupRef = useRef<THREE.Group>(null);
  const shadowGroupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshBasicMaterial>(null);

  const isWrong = phase === 'GAME_OVER';
  // 피그마 크기: 달리기(160x222) -> 0.68x0.94, 오답(167x201) -> 0.78x0.94 (비율 유지)
  const charWidth = isWrong ? 0.78 : 0.68;
  const charHeight = isWrong ? 0.94 : 0.94;

  // 그림자 크기: GAME_OVER 시 너비는 유지하고 세로 길이를 늘려 원에 가깝게 변경 (0.6 -> 0.8)
  const shadowScale: [number, number, number] = isWrong ? [0.8, 1.6, 1.0] : [0.8, 1.0, 1.0];

  // Snappy, smooth keyboard lateral sliding (Lerp) and frame alternating
  useFrame((state, delta) => {
    if (groupRef.current) {
      // 프레임레이트에 독립적인 Lerp 슬라이딩 적용
      const alpha = 1 - Math.exp(-12 * delta);
      groupRef.current.position.x = THREE.MathUtils.lerp(
        groupRef.current.position.x,
        targetX,
        alpha
      );
      // y축과 z축은 props 값을 직접 대입하여 리액트 리렌더링 시 x가 0으로 강제 초기화되는 현상 방지
      groupRef.current.position.y = position[1];
      groupRef.current.position.z = position[2];

      // 👁️ 카메라 원근 왜곡을 상쇄하기 위해 그림자 그룹의 Y축 회전을 카메라 시선 각도와 정렬
      if (shadowGroupRef.current) {
        const dx = groupRef.current.position.x - state.camera.position.x;
        const dz = groupRef.current.position.z - state.camera.position.z;
        shadowGroupRef.current.rotation.y = Math.atan2(dx, dz);
      }
    }

    if (materialRef.current) {
      if (isWrong) {
        materialRef.current.map = textureWrong;
      } else {
        const elapsed = state.clock.getElapsedTime();
        const frame = Math.floor(elapsed / 0.3) % 2;
        materialRef.current.map = frame === 0 ? texture1 : texture2;
      }
    }
  });

  return (
    <group ref={groupRef}>
      {/* 1. Foot Shadow (Wrapper Group for camera alignment to prevent perspective skewing) */}
      <group ref={shadowGroupRef} position={[0, 0.005, -0.1]}>
        <mesh
          rotation={[-Math.PI / 2, 0, 0]}
          scale={shadowScale}
          onUpdate={(self) => { self.renderOrder = 1; }}
        >
          <circleGeometry args={[0.44, 64]} />
          <meshBasicMaterial
            color="#000000"
            transparent
            opacity={0.16}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      </group>

      {/* 2. Cute Chick Character scaled down by 50% (Billboard facing the camera) */}
      {/* Billboard centered at Y = height / 2 = 0.47 */}
      <Billboard position={[0, 0.47, 0]}>
        <mesh onUpdate={(self) => { self.renderOrder = 10; }}>
          <planeGeometry args={[charWidth, charHeight]} />
          <meshBasicMaterial
            ref={materialRef}
            map={isWrong ? textureWrong : texture1}
            transparent
            side={THREE.DoubleSide}
            depthWrite={true}
          />
        </mesh>
      </Billboard>
    </group>
  );
}

// 🚀 Preload textures globally to prevent Suspense fallback unmounts during gameplay transitions!
useTexture.preload(imgRun1);
useTexture.preload(imgRun2);
useTexture.preload(imgWrong);
