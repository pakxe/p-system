import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { BufferGeometry, Line, Mesh, Vector3 } from 'three';

interface OrbitProps {
  planetRef?: React.RefObject<Mesh>; // 행성의 위치를 참조
  radius: number; // 궤도의 반지름
}

function Orbit({ planetRef, radius }: OrbitProps) {
  const lineRef = useRef<Line>(null!);
  // 궤도 점 생성 (고정된 점)
  const points = Array.from({ length: 64 }, (_, i) => {
    const angle = (i / 64) * Math.PI * 2;
    return new Vector3(radius * Math.cos(angle), 0, radius * Math.sin(angle));
  });

  const orbitGeometry = new BufferGeometry().setFromPoints(points);

  useFrame(() => {
    if (!lineRef.current || !planetRef?.current) return;

    // 행성의 현재 위치를 참조하여 궤도 중심을 이동
    const planetPosition = planetRef.current.position;
    lineRef.current.position.set(planetPosition.x, planetPosition.y, planetPosition.z);
  });

  // 오류는 svg의 line과 헷갈려서 발생. 타입을 강제로 덮어씌우는 방법밖에 없으므로 오류를 무시한다.
  return (
    <line ref={planetRef && lineRef}>
      <bufferGeometry attach='geometry' {...orbitGeometry} />
      <lineBasicMaterial attach='material' color='white' />
    </line>
  );
}

export default Orbit;
