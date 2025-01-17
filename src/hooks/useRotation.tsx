import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import { Mesh } from 'three';

type Props = {
  axialTilt: number;
  rotationSpeed: number;

  planetRef: React.RefObject<Mesh>;
};

const useRotation = ({ planetRef, axialTilt, rotationSpeed }: Props) => {
  const axialTiltRadians = useRef((axialTilt * Math.PI) / 180);

  useFrame(() => {
    if (!planetRef.current) return;

    planetRef.current.rotation.x = axialTiltRadians.current;
    planetRef.current.rotation.y += rotationSpeed;
  });
};

export default useRotation;
