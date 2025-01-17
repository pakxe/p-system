import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Mesh } from 'three';

type Props = {
  planetRef: React.RefObject<Mesh>;
  centerRef?: React.RefObject<Mesh>;

  orbitalSpeed: number;
  orbitalRadius: number;
};

const useOrbit = ({ planetRef, orbitalSpeed, centerRef, orbitalRadius }: Props) => {
  const angleRef = useRef(0);
  const curLocation = useRef({ x: 0, z: 0 });

  useFrame(() => {
    // 행성(위성아님)은 currentRef가 없기 떄문에 성능..
    if (!planetRef.current) return;

    angleRef.current += orbitalSpeed; // 각속도 +

    const centerX = centerRef?.current ? centerRef.current.position.x : 0;
    const centerZ = centerRef?.current ? centerRef.current.position.z : 0;

    const x = centerX + orbitalRadius * Math.cos(angleRef.current);
    const z = centerZ + orbitalRadius * Math.sin(angleRef.current);

    planetRef.current.position.set(x, 0, z);
    curLocation.current = { x, z };
  });

  return curLocation;
};

export default useOrbit;
