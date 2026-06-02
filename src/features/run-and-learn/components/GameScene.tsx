import { Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import Background from './Background';
import Pathway from './Pathway';
import Scenery from './Scenery';
import AnswerWall from './AnswerWall';
import Character from './Character';

// Camera lock helper to ensure perfect alignment to the horizon target
function CameraController() {
  useFrame((state) => {
    state.camera.lookAt(0, -0.3, -5.0);
  });
  return null;
}

// 🚪 Answer Wall at a fixed visible position for now
function FixedAnswerWall() {
  return (
    <group>
      {/* Anchor the spawn point of the doors at a visible distance */}
      <AnswerWall positionZ={-15} />
    </group>
  );
}

export default function GameScene() {
  // Temporarily hardcode lane to middle (1)
  const lane = 1;
  const lanes = [-1.54, 0.0, 1.54];
  const targetX = lanes[lane];

  return (
    <div 
      tabIndex={0}
      style={{ outline: 'none' }}
      className="absolute inset-0 w-full h-full overflow-hidden"
    >
      <Canvas
        flat
        gl={{ antialias: true }}
        // Low camera height gives a beautiful speed rush and matches perspective of 2D assets
        camera={{ fov: 26, position: [0, 1.2, 8.0] }}
        style={{ width: '100%', height: '100%' }}
      >
        {/* sRGB matching Backdrop color */}
        <color attach="background" args={["#D6f3ff"]} />

        {/* Lights (kept ambient strong to fit 2D flat vibe) */}
        <ambientLight intensity={1.5} />
        <directionalLight position={[0, 10, 5]} intensity={0.5} />

        {/* Lock camera perspective */}
        <CameraController />

        {/* Suspense Wrapper for smooth asset loading */}
        <Suspense fallback={null}>
          {/* 1. Sky & Clouds */}
          <Background />

          {/* 2. Grass Ground & Sandy Road (Now fully extended to support advancing doors) */}
          <Pathway />

          {/* 3. Environment Decoration (Rocks & Flowers with shadows) */}
          <Scenery />

          {/* 4. Option Answer Wall (Fixed at visible position) */}
          <FixedAnswerWall />

          {/* 5. Player Chick Character 'Engdu' with dynamic Lerp snap target */}
          <Character targetX={targetX} position={[0, -1.19, 0.5]} />
        </Suspense>
      </Canvas>
    </div>
  );
}
