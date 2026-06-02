import * as THREE from 'three';

export default function Pathway() {
  return (
    <group>
      {/* 1. Grass Ground Plane (Extends from z = -65 to z = +20 to cover camera's rear and front) */}
      <mesh position={[0, -1.2, -22.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[120, 85]} />
        <meshBasicMaterial color="#b6ea82" side={THREE.DoubleSide} />
      </mesh>

      {/* 2. Sandy Pathway/Road (Laid flat on top, matching cards width: 4.62) */}
      <mesh position={[0, -1.195, -22.5]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4.62, 85]} />
        <meshBasicMaterial color="#e6b485" side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}
