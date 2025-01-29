import { Mesh } from 'three';
import { TStar } from '../types';
import Model from './Model';
import { useRef } from 'react';
import useRotation from '../hooks/useRotation';

type Props = TStar & {
  modelName?: string;
  isCenter?: boolean;

  centerRef?: React.RefObject<Mesh>;
  onClick: (ref: React.RefObject<Mesh>, name: string) => void;
  onExplore: () => void;
};

// 아직까지 star는 반드시 중심에 있는다.
const Star = ({ onClick, name, modelName, axialTilt, rotationSpeed, objectRadius }: Props) => {
  const planetRef = useRef<Mesh>(null);

  useRotation({ planetRef, axialTilt, rotationSpeed });

  return (
    <group>
      <mesh
        ref={planetRef}
        onClick={() => {
          if (onClick) onClick(planetRef, name);
        }}>
        <sphereGeometry args={[objectRadius, 32, 32]} />
        <meshStandardMaterial
          emissive='#f56a00' // 발광 색상
          emissiveIntensity={0.2} // 발광 강도
        />
      </mesh>
    </group>
  );
};

export default Star;
