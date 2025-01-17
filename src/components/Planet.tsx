import { RefObject, useRef, useState } from 'react';
import { Mesh, Vector3 } from 'three';
import { Html } from '@react-three/drei';
import Orbit from './Orbit';
import { TPlanet } from '../types';
import SystemObjectInfoModal from './SystemObjectInfoModal/SystemObjectInfoModal';
import { useFrame } from '@react-three/fiber';
import useRotation from '../hooks/useRotation';
import useOrbit from '../hooks/useOrbit';
import Satellite from './Satellite';

type Props = TPlanet & {
  targetName?: string | null;
  centerRef?: React.RefObject<Mesh>;

  onHover?: (name: string | null) => void;
  onClick?: (ref: RefObject<Mesh>, name: string) => void;
  onExplore?: () => void;
};

function Planet({
  name,
  onClick,
  onHover,
  orbitalSpeed,
  orbitalRadius,
  satellites,
  targetName,
  onExplore,
  rotationSpeed,
  axialTilt,
  centerRef,
  mainColor,
  objectRadius,
}: Props) {
  const [hovered, setHover] = useState(false);

  const planetRef = useRef<Mesh>(null);
  const modalRef = useRef<Mesh>(null);

  const location = useOrbit({ planetRef: planetRef, orbitalSpeed, centerRef, orbitalRadius });
  useRotation({ planetRef, axialTilt, rotationSpeed });

  useFrame(() => {
    // 행성과 모달 위치 계산 프레임
    if (!planetRef.current) return;

    // 행성 모달 위치. 행성의 오른쪽에 위치
    if (modalRef.current) modalRef.current.position.set(location.current.x - 7, 0, location.current.z);
  });

  return (
    <group>
      <Orbit radius={orbitalRadius} />
      {/* 행성 렌더링 */}
      <mesh
        ref={planetRef}
        onClick={() => {
          if (onClick) onClick(planetRef, name);
        }}
        onPointerOver={() => {
          if (onHover) onHover(name);
          setHover(true);
        }}
        onPointerOut={() => {
          setHover(false);
          if (onHover) onHover(null);
        }}>
        {name === 'Earth' ? (
          // <Model />
          <></>
        ) : (
          <>
            <sphereGeometry args={[objectRadius, 32, 32]} />
            <meshStandardMaterial
              color={mainColor}
              emissive='#ffffff' // 발광 색상
              emissiveIntensity={0.2} // 발광 강도
            />
          </>
        )}
      </mesh>

      {/* 위성 렌더링 */}
      {satellites &&
        satellites.map((satellite) => <Satellite key={satellite.name} {...satellite} centerRef={planetRef} />)}

      {/* 모달 렌더링 */}
      {targetName === name && (
        <group>
          <mesh ref={modalRef} position={[0, 0, 0]} rotation={[0.25, -Math.PI / 4, 0]}>
            <Html
              position={[0, -1, 0]}
              center
              style={{
                transform: 'translate(-20%, -30%)',
              }}>
              <SystemObjectInfoModal
                name={name}
                planetMeshRef={planetRef}
                onExplore={() => {
                  if (onExplore) onExplore();
                }}
              />
            </Html>
          </mesh>
        </group>
      )}
    </group>
  );
}

export default Planet;
