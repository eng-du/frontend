import { Billboard, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import imgCloudLarge from '@/assets/game/cloud_large.svg';
import imgCloudSmall from '@/assets/game/cloud_small.svg';

export default function Background() {
  const cloudLargeTexture = useTexture(imgCloudLarge);
  const cloudSmallTexture = useTexture(imgCloudSmall);

  // Apply sRGB Color Space to prevent washed out/dull flat colors!
  cloudLargeTexture.colorSpace = THREE.SRGBColorSpace;
  cloudSmallTexture.colorSpace = THREE.SRGBColorSpace;

  return (
    <group>
      {/* 1. Flat Sky Backdrop */}
      <mesh position={[0, 8, -45]}>
        <planeGeometry args={[160, 80]} />
        <meshBasicMaterial color="#D6f3ff" side={THREE.DoubleSide} />
      </mesh>

      {/* 2. Floating Clouds (Statically positioned in 3D Space) */}

      {/* A. Left Top Large Cloud */}
      <Billboard position={[-5.0, 3.8, -25]}>
        <mesh>
          <planeGeometry args={[4.08, 2.32]} />
          <meshBasicMaterial
            map={cloudLargeTexture}
            transparent
            opacity={0.8}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      </Billboard>

      {/* B. Right Middle Large Cloud */}
      <Billboard position={[6.2, 1.8, -22]}>
        <mesh>
          <planeGeometry args={[4.08, 2.32]} />
          <meshBasicMaterial
            map={cloudLargeTexture}
            transparent
            opacity={0.8}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      </Billboard>

      {/* C. Left Bottom Small Cloud */}
      <Billboard position={[-6.8, 1.2, -18]}>
        <mesh>
          <planeGeometry args={[2.0, 0.9]} />
          <meshBasicMaterial
            map={cloudSmallTexture}
            transparent
            opacity={0.7}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      </Billboard>

      {/* D. Right Top Small Cloud */}
      <Billboard position={[8.5, 4.2, -28]}>
        <mesh>
          <planeGeometry args={[2.0, 0.9]} />
          <meshBasicMaterial
            map={cloudSmallTexture}
            transparent
            opacity={0.7}
            side={THREE.DoubleSide}
            depthWrite={false}
          />
        </mesh>
      </Billboard>
    </group>
  );
}
