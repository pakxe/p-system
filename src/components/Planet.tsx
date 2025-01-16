import { RefObject, useRef, useState } from 'react';
import { Mesh, Vector3 } from 'three';
import Model from './Model';
import { Html } from '@react-three/drei';
import Orbit from './Orbit';
import { TPlanet } from '../types';
import SystemObjectInfoModal from './SystemObjectInfoModal/SystemObjectInfoModal';
import { useFrame } from '@react-three/fiber';

type Props = TPlanet & {
  targetName?: string | null;
  centerRef?: React.RefObject<Mesh>;

  onHover?: (name: string | null) => void;
  onClick?: (ref: RefObject<Mesh>) => void;
  onExplore?: () => void;
};

function Planet({
  mainColor,
  name,
  onClick,
  onHover,
  orbitalSpeed,
  orbitalRadius,
  satellites,
  targetName,
  planetRadius,
  centerRef,
  onExplore,
  rotationSpeed,
  axialTilt,
}: Props) {
  const planetMeshRef = useRef<Mesh>(null);
  const [hovered, setHover] = useState(false);

  const modalRef = useRef<Mesh>(null);

  const angleRef = useRef(0);

  useFrame(() => {
    // 행성과 모달 위치 계산 프레임
    if (!planetMeshRef.current) return;

    angleRef.current += orbitalSpeed; // 각속도 +

    const centerX = centerRef?.current?.position.x ?? 0;
    const centerZ = centerRef?.current?.position.z ?? 0;

    const x = centerX + orbitalRadius * Math.cos(angleRef.current);
    const z = centerZ + orbitalRadius * Math.sin(angleRef.current);

    planetMeshRef.current.position.set(x, 0, z); // 반영

    // 자전
    planetMeshRef.current.rotation.x = (axialTilt * Math.PI) / 180;
    planetMeshRef.current.rotation.y += rotationSpeed;

    // 행성 모달 위치. 행성의 오른쪽에 위치
    if (modalRef.current) modalRef?.current.position.set(x - 7, 0, z);
  });

  return (
    <group>
      {/* 행성 렌더링 */}
      <mesh
        ref={planetMeshRef}
        onClick={() => {
          if (onClick) onClick(planetMeshRef);
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
          <Model />
        ) : (
          <>
            <sphereGeometry args={[planetRadius, 32, 32]} />
            <meshStandardMaterial
              color={hovered ? 'white' : mainColor}
              emissive='#ffffff' // 발광 색상
              emissiveIntensity={0.2} // 발광 강도
            />
          </>
        )}
      </mesh>

      {/* 위성 렌더링 */}
      {satellites &&
        satellites.map((satellite, index) => (
          <group key={index}>
            <Orbit planetRef={planetMeshRef} radius={satellite.orbitalRadius} />
            <Planet
              {...satellite}
              centerRef={planetMeshRef}
              orbitalCenter={
                new Vector3(planetMeshRef.current?.position.x || 0, 0, planetMeshRef.current?.position.z || 0)
              }
            />
          </group>
        ))}

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
                planetMeshRef={planetMeshRef}
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
