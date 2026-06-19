import { Billboard, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import imgRockLeft from '@/assets/game/rock_left.svg';
import imgRockRight from '@/assets/game/rock_right.svg';
import imgShadowRock from '@/assets/game/shadow_rock.svg';
import imgFlower from '@/assets/game/flower.svg';
import imgShadowFlower from '@/assets/game/shadow_flower.svg';

export default function Scenery() {
  const rockLeftTex = useTexture(imgRockLeft);
  const rockRightTex = useTexture(imgRockRight);
  const shadowRockTex = useTexture(imgShadowRock);
  const flowerTex = useTexture(imgFlower);
  const shadowFlowerTex = useTexture(imgShadowFlower);

  // Set all textures to sRGB color space to preserve vibrant 2D hues
  rockLeftTex.colorSpace = THREE.SRGBColorSpace;
  rockRightTex.colorSpace = THREE.SRGBColorSpace;
  shadowRockTex.colorSpace = THREE.SRGBColorSpace;
  flowerTex.colorSpace = THREE.SRGBColorSpace;
  shadowFlowerTex.colorSpace = THREE.SRGBColorSpace;

  return (
    <group>
      {/* ============================================================== */}
      {/* ⛰️ LEFT SIDE SCENERY: Rock & Flower */}
      {/* ============================================================== */}
      
      {/* 1. Left Rock Shadow */}
      <mesh position={[-3.2, -1.19, -10]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.78, 0.66]} />
        <meshBasicMaterial 
          map={shadowRockTex} 
          transparent 
          opacity={0.35} 
          side={THREE.DoubleSide} 
          depthWrite={false}
        />
      </mesh>
      
      {/* 2. Left Rock Body */}
      <Billboard position={[-3.2, -0.72, -10]}>
        <mesh>
          <planeGeometry args={[1.38, 0.82]} />
          <meshBasicMaterial 
            map={rockLeftTex} 
            transparent 
            side={THREE.DoubleSide} 
            depthWrite={false}
          />
        </mesh>
      </Billboard>

      {/* 3. Left Flower Shadow */}
      <mesh position={[-3.8, -1.19, -7]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.80, 0.30]} />
        <meshBasicMaterial 
          map={shadowFlowerTex} 
          transparent 
          opacity={0.3} 
          side={THREE.DoubleSide} 
          depthWrite={false}
        />
      </mesh>
      
      {/* 4. Left Flower Body */}
      <Billboard position={[-3.8, -0.80, -7]}>
        <mesh>
          <planeGeometry args={[0.60, 0.81]} />
          <meshBasicMaterial 
            map={flowerTex} 
            transparent 
            side={THREE.DoubleSide} 
            depthWrite={false}
          />
        </mesh>
      </Billboard>


      {/* ============================================================== */}
      {/* ⛰️ RIGHT SIDE SCENERY: Rock & Two Flowers */}
      {/* ============================================================== */}

      {/* 5. Right Rock Shadow */}
      <mesh position={[3.2, -1.19, -9]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[1.78, 0.66]} />
        <meshBasicMaterial 
          map={shadowRockTex} 
          transparent 
          opacity={0.35} 
          side={THREE.DoubleSide} 
          depthWrite={false}
        />
      </mesh>
      
      {/* 6. Right Rock Body */}
      <Billboard position={[3.2, -0.63, -9]}>
        <mesh>
          <planeGeometry args={[1.46, 1.03]} />
          <meshBasicMaterial 
            map={rockRightTex} 
            transparent 
            side={THREE.DoubleSide} 
            depthWrite={false}
          />
        </mesh>
      </Billboard>

      {/* 7. Right Flower 1 Shadow (Frontmost) */}
      <mesh position={[3.8, -1.19, -6]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.80, 0.30]} />
        <meshBasicMaterial 
          map={shadowFlowerTex} 
          transparent 
          opacity={0.3} 
          side={THREE.DoubleSide} 
          depthWrite={false}
        />
      </mesh>
      
      {/* 8. Right Flower 1 Body */}
      <Billboard position={[3.8, -0.80, -6]}>
        <mesh>
          <planeGeometry args={[0.60, 0.81]} />
          <meshBasicMaterial 
            map={flowerTex} 
            transparent 
            side={THREE.DoubleSide} 
            depthWrite={false}
          />
        </mesh>
      </Billboard>

      {/* 9. Right Flower 2 Shadow (Backmost) */}
      <mesh position={[2.8, -1.19, -12]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.80, 0.30]} />
        <meshBasicMaterial 
          map={shadowFlowerTex} 
          transparent 
          opacity={0.3} 
          side={THREE.DoubleSide} 
          depthWrite={false}
        />
      </mesh>
      
      {/* 10. Right Flower 2 Body */}
      <Billboard position={[2.8, -0.73, -12]}>
        <mesh>
          <planeGeometry args={[0.60, 0.81]} />
          <meshBasicMaterial 
            map={flowerTex} 
            transparent 
            side={THREE.DoubleSide} 
            depthWrite={false}
          />
        </mesh>
      </Billboard>
    </group>
  );
}
