import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Mesh } from 'three';

export interface SatelliteProps {
  color: string;
  radius: number; // 위성의 궤도 반지름
  speed: number; // 위성의 회전 속도
}

function Satellite({ planetRef, color, radius, speed }: SatelliteProps & { planetRef: React.RefObject<THREE.Mesh> }) {
  const meshRef = useRef<Mesh>(null!);
  const angleRef = useRef(0); // 위성의 각도 추적

  useFrame(() => {
    if (!meshRef.current || !planetRef.current) return;

    // 행성의 현재 위치를 중심으로 궤도를 따라 회전
    const planetPosition = planetRef.current.position;
    angleRef.current += speed;

    const x = planetPosition.x + radius * Math.cos(angleRef.current);
    const z = planetPosition.z + radius * Math.sin(angleRef.current);

    meshRef.current.position.set(x, 0, z);
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.2, 32, 32]} /> {/* 위성 크기 */}
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

export default Satellite;
