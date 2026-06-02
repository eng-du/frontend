import { useMemo } from 'react';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface DoorProps {
  position?: [number, number, number];
  keyholeTextureUrl: string; // SVG path
}

export default function Door({ position = [0, 0, 0], keyholeTextureUrl }: DoorProps) {
  // Load SVG texture for the door icon shape (rhombus, heart, star)
  const patternTexture = useTexture(keyholeTextureUrl);
  patternTexture.colorSpace = THREE.SRGBColorSpace;

  // 🚪 Generate clean 3D Vector Geometry with an Arched top!
  // Exact Figma converted Bezier path matches M44 0C68.3005 0 88 12.7137 88 28.3969V120H0V28.3969C0 12.7137 19.6995 0 44 0Z
  const doorGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    
    // Start at bottom-left (0, 0)
    shape.moveTo(0, 0);
    
    // Go up the left side hinge to the start of the arch bend (1.20 - 0.284 = 0.916)
    shape.lineTo(0, 0.916);
    
    // Curve smoothly to the top center peak (0.44, 1.20)
    shape.bezierCurveTo(0, 0.916 + 0.127, 0.197, 1.20, 0.44, 1.20);
    
    // Curve down to the right arch bend (0.88, 0.916)
    shape.bezierCurveTo(0.683, 1.20, 0.88, 0.916 + 0.127, 0.88, 0.916);
    
    // Go down the right side to the bottom right corner (0.88, 0)
    shape.lineTo(0.88, 0);
    
    shape.closePath();
    return new THREE.ShapeGeometry(shape);
  }, []);

  return (
    <group position={position}>
      {/* A. Arched Door Base Mesh (Perfect mathematical vector match with the punched keyhole) */}
      <mesh geometry={doorGeometry}>
        <meshBasicMaterial color="#9e5c36" side={THREE.DoubleSide} />
      </mesh>

      {/* B. Gold/Brass Door Handle Knob (Figma relative center Y = 120 - 65 = 55 -> 0.55) */}
      <mesh position={[0.73, 0.55, 0.005]}>
        <circleGeometry args={[0.045, 32]} />
        <meshBasicMaterial color="#D5A15F" side={THREE.DoubleSide} />
      </mesh>

      {/* C. SVG Pattern Overlay (Figma relative center Y = 120 - 37.5 = 82.5 -> 0.825, size 0.45x0.45) */}
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
  );
}
