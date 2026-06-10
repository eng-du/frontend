import { useTexture, Billboard } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

import imgDebrisSm from '@/assets/game/fx_debris_sm.svg';
import imgDebrisMd from '@/assets/game/fx_debris_md.svg';
import imgDebrisLg from '@/assets/game/fx_debris_lg.svg';
import imgSmokeSm from '@/assets/game/fx_smoke_sm.svg';
import imgSmokeMd from '@/assets/game/fx_smoke_md.svg';
import imgSmokeLg from '@/assets/game/fx_smoke_lg.svg';

interface DoorBreakEffectProps {
  position?: [number, number, number];
}

export default function DoorBreakEffect({ position = [0, 0, 0] }: DoorBreakEffectProps) {
  const debrisSmTex = useTexture(imgDebrisSm);
  const debrisMdTex = useTexture(imgDebrisMd);
  const debrisLgTex = useTexture(imgDebrisLg);
  const smokeSmTex = useTexture(imgSmokeSm);
  const smokeMdTex = useTexture(imgSmokeMd);
  const smokeLgTex = useTexture(imgSmokeLg);

  // Apply sRGB ColorSpace
  debrisSmTex.colorSpace = THREE.SRGBColorSpace;
  debrisMdTex.colorSpace = THREE.SRGBColorSpace;
  debrisLgTex.colorSpace = THREE.SRGBColorSpace;
  smokeSmTex.colorSpace = THREE.SRGBColorSpace;
  smokeMdTex.colorSpace = THREE.SRGBColorSpace;
  smokeLgTex.colorSpace = THREE.SRGBColorSpace;

  const smokeRefs = useRef<THREE.Group[]>([]);
  const smokeMatRefs = useRef<THREE.MeshBasicMaterial[]>([]);
  const debrisRefs = useRef<THREE.Group[]>([]);

  // Configure movement trajectories and configurations
  const smokeData = useMemo(
    () => [
      {
        tex: smokeLgTex,
        args: [1.0, 1.1] as [number, number],
        initPos: [0.0, 0.6, 0.01] as [number, number, number],
        vx: -0.15,
        vy: 0.8,
        maxLife: 0.6,
        scaleMult: 1.1,
      },
      {
        tex: smokeMdTex,
        args: [0.6, 0.6] as [number, number],
        initPos: [0.3, 0.3, 0.02] as [number, number, number],
        vx: 0.3,
        vy: 1.0,
        maxLife: 0.5,
        scaleMult: 1.0,
      },
      {
        tex: smokeSmTex,
        args: [0.45, 0.48] as [number, number],
        initPos: [-0.3, 0.2, 0.03] as [number, number, number],
        vx: -0.4,
        vy: 0.7,
        maxLife: 0.4,
        scaleMult: 0.9,
      },
    ],
    [smokeLgTex, smokeMdTex, smokeSmTex],
  );

  const debrisData = useMemo(
    () => [
      {
        tex: debrisLgTex,
        args: [0.6, 0.3] as [number, number],
        initPos: [0.1, 0.5, 0.05] as [number, number, number],
        vx: 1.5,
        vy: 3.2,
        vz: 1.2,
        spin: 4.5,
      },
      {
        tex: debrisMdTex,
        args: [0.45, 0.32] as [number, number],
        initPos: [-0.2, 0.4, 0.06] as [number, number, number],
        vx: -1.8,
        vy: 3.5,
        vz: 0.9,
        spin: -5.0,
      },
      {
        tex: debrisSmTex,
        args: [0.3, 0.15] as [number, number],
        initPos: [0.0, 0.1, 0.07] as [number, number, number],
        vx: 0.3,
        vy: -0.5,
        vz: 0.5,
        spin: 3.0,
      },
    ],
    [debrisLgTex, debrisMdTex, debrisSmTex],
  );

  const timeRef = useRef(0);
  const gravity = -8.5;

  useFrame((_, delta) => {
    timeRef.current += delta;
    const t = timeRef.current;

    smokeData.forEach((data, index) => {
      const ref = smokeRefs.current[index];
      if (!ref) return;

      const progress = Math.min(1.0, t / data.maxLife);
      const currentScale = Math.min(1.0, progress * 6.5) * data.scaleMult;
      ref.scale.set(currentScale, currentScale, 1);

      ref.position.set(data.initPos[0] + data.vx * t, data.initPos[1] + data.vy * t, data.initPos[2]);

      const mat = smokeMatRefs.current[index];
      if (mat) {
        mat.opacity = 1.0 - progress;
      }
    });

    debrisData.forEach((data, index) => {
      const ref = debrisRefs.current[index];
      if (!ref) return;

      ref.position.set(
        data.initPos[0] + data.vx * t,
        data.initPos[1] + (data.vy * t + 0.5 * gravity * t * t),
        data.initPos[2] + data.vz * t,
      );

      ref.rotation.z = data.spin * t;
      ref.rotation.y = data.spin * 0.5 * t;
    });
  });

  return (
    <group position={position} renderOrder={30}>
      {smokeData.map((data, index) => (
        <Billboard
          key={`smoke-${index}`}
          ref={(el) => {
            if (el) smokeRefs.current[index] = el;
          }}
          position={data.initPos}
          renderOrder={30}
        >
          <mesh renderOrder={30}>
            <planeGeometry args={data.args} />
            <meshBasicMaterial
              ref={(el) => {
                if (el) smokeMatRefs.current[index] = el;
              }}
              map={data.tex}
              transparent
              depthTest={false}
              depthWrite={false}
              side={THREE.DoubleSide}
            />
          </mesh>
        </Billboard>
      ))}

      {debrisData.map((data, index) => (
        <group
          key={`debris-${index}`}
          ref={(el) => {
            if (el) debrisRefs.current[index] = el;
          }}
          position={data.initPos}
          renderOrder={30}
        >
          <mesh renderOrder={30}>
            <planeGeometry args={data.args} />
            <meshBasicMaterial 
              map={data.tex} 
              transparent 
              depthTest={false}
              depthWrite={false}
              side={THREE.DoubleSide} 
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// Global preload to prevent runtime Suspense fallback when shattering
useTexture.preload(imgDebrisSm);
useTexture.preload(imgDebrisMd);
useTexture.preload(imgDebrisLg);
useTexture.preload(imgSmokeSm);
useTexture.preload(imgSmokeMd);
useTexture.preload(imgSmokeLg);

