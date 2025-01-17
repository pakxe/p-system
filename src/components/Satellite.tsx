import { Mesh } from 'three';
import { TSatellite } from '../types';
import useRotation from '../hooks/useRotation';
import { useRef } from 'react';
import useOrbit from '../hooks/useOrbit';
import Orbit from './Orbit';

type Props = TSatellite & {
  centerRef: React.RefObject<Mesh>;
};

const Satellite = ({ orbitalRadius, orbitalSpeed, centerRef, axialTilt, rotationSpeed, objectRadius }: Props) => {
  const satelliteRef = useRef<Mesh>(null);

  useRotation({ planetRef: satelliteRef, axialTilt, rotationSpeed });
  useOrbit({ planetRef: satelliteRef, orbitalSpeed, centerRef, orbitalRadius });

  return (
    <>
      <Orbit radius={orbitalRadius} planetRef={centerRef} />
      <mesh ref={satelliteRef}>
        <sphereGeometry args={[objectRadius, 32, 32]} />
        <meshStandardMaterial
          // color={hovered ? 'white' : mainColor}
          emissive='#ffffff' // 발광 색상
          emissiveIntensity={0.2} // 발광 강도
        />
      </mesh>
    </>
  );
};

export default Satellite;
