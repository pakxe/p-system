import { useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import { Mesh, Vector3 } from 'three';
import Model from './Model';
import { Html } from '@react-three/drei';
import { css, keyframes } from '@emotion/react';
import Orbit from './Orbit';
import Satellite from './Satellite';

const zeroGravityShake = keyframes`
  0% {
    transform: translate(0, 0) rotate(0deg) skewX(355deg);
  }
  10% {
    transform: translate(5px, -5px) rotate(1deg) skewX(356deg);
  }
  20% {
    transform: translate(-6px, 6px) rotate(-1.5deg) skewX(357deg);
  }
  30% {
    transform: translate(4px, -4px) rotate(2deg) skewX(355deg);
  }
  40% {
    transform: translate(-5px, 5px) rotate(-2.5deg) skewX(354deg);
  }
  50% {
    transform: translate(3px, -3px) rotate(1.5deg) skewX(355deg);
  }
  60% {
    transform: translate(-4px, 4px) rotate(-1deg) skewX(356deg);
  }
  70% {
    transform: translate(2px, -2px) rotate(0.9deg) skewX(357deg);
  }
  80% {
    transform: translate(-3px, 3px) rotate(-0.5deg) skewX(356deg);
  }
  90% {
    transform: translate(1px, -1px) rotate(0.5deg) skewX(355deg);
  }
  100% {
    transform: translate(0, 0) rotate(0deg) skewX(355deg);
  }
  `;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8) translateY(20px); /* 약간 작고 아래에 위치 */
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0); /* 원래 크기와 위치 */
  }
  `;

interface SatelliteProps {
  color: string;
  radius: number; // 위성의 궤도 반지름
  speed: number; // 위성의 회전 속도
}

interface PlanetProps {
  color: string;
  name: string;
  radius: number; // 궤도 반지름
  speed: number; // 회전 속도
  onClick: (position: number[]) => void;
  onHover: (name: string | null) => void;
  satellites?: SatelliteProps[]; // 위성 배열
  targetName: string | null;
}

function Planet({
  color,
  name,
  onClick,
  onHover,
  speed,
  radius,
  satellites,
  targetName,
  onExplore,
}: PlanetProps & {
  onClick: (ref: React.RefObject<Mesh>) => void;
  onExplore: (position: Vector3) => void;
}) {
  const meshRef = useRef<Mesh>(null!);
  const angleRef = useRef(0); // 각도를 추적
  // 호버
  const [hovered, setHover] = useState(false);

  const modalRef = useRef<Mesh>(null);

  useFrame(() => {
    if (!meshRef.current) return;

    // 궤도를 따라 회전
    angleRef.current += speed;
    const x = radius * Math.cos(angleRef.current);
    const z = radius * Math.sin(angleRef.current);
    meshRef.current.position.set(x, 0, z);

    if (modalRef.current) modalRef?.current.position.set(x - 7, 0, z);
  });

  return (
    <group>
      <mesh
        ref={meshRef}
        onClick={() => {
          onClick(meshRef);
          // setIsClicked(true);
        }} // 클릭 시 ref 전달
        onPointerOver={() => {
          onHover(name);
          setHover(true);
        }}
        onPointerOut={() => {
          setHover(false);
          onHover(null);
        }}>
        {name === 'Earth' ? (
          <Model />
        ) : (
          // <></>
          <>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial color={hovered ? 'white' : color} />
          </>
        )}
      </mesh>

      {/* 위성 렌더링 */}
      {satellites?.map((satellite, index) => (
        <group key={index}>
          <Orbit planetRef={meshRef} radius={satellite.radius} />
          <Satellite {...satellite} planetRef={meshRef} />
        </group>
      ))}

      {targetName === name && (
        <group>
          <mesh ref={modalRef} position={[0, 0, 0]} rotation={[0.25, -Math.PI / 4, 0]}>
            {/* <boxGeometry args={[5, 3, 0.25]} />
              <meshStandardMaterial color='white' /> */}

            {/* HTML 버튼 추가 */}
            <Html
              position={[0, -1, 0]}
              center
              style={{
                transform: 'translate(-20%, -30%)',
              }}>
              <div
                css={css`
                  padding: 16px;
                  font-size: 14px;
                  background-color: #ffffffd6;
                  border-radius: 10px;
                  cursor: pointer;
                  width: 300px;
                  height: 200px;
                  display: flex;
                  flex-direction: column;
                  justify-content: space-between;

                  /* 애니메이션: fadeIn + zeroGravityShake */
                  animation: ${fadeIn} 0.5s ease-out forwards,
                    /* 처음 등장 애니메이션 */ ${zeroGravityShake} 5s infinite ease-in-out; /* 부드럽게 흔들리는 애니메이션 */

                  /* 3D 효과 */
                  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.1), 0px 6px 10px rgba(0, 0, 0, 0.05),
                    0px 10px 15px rgba(0, 0, 0, 0.03);
                  transform-style: preserve-3d;
                  transform: rotateX(5deg) rotateY(-5deg); /* 카드에 약간의 입체감을 줌 */

                  &:hover {
                    transform: rotateX(0deg) rotateY(0deg) scale(1.03); /* 호버 시 정면으로 */
                    box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.2), 0px 10px 20px rgba(0, 0, 0, 0.1);
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                  }
                `}>
                <div>
                  <h2
                    css={css`
                      font-weight: 700;
                      color: #333;
                    `}>
                    {name}
                  </h2>
                  <p
                    css={css`
                      color: #666;
                    `}>
                    플래닛의 설명을 적어주세요!
                  </p>
                </div>

                <button
                  css={css`
                    padding: 10px 20px;
                    background-color: #f17086;
                    color: white;
                    border: none;
                    border-radius: 5px;
                    font-size: 14px;
                    cursor: pointer;
                    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.2);
                    transition: transform 0.2s ease, box-shadow 0.2s ease;

                    &:hover {
                      transform: scale(1.05);
                      box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.3);
                    }
                  `}
                  onClick={() => {
                    if (meshRef.current) {
                      const planetPosition = meshRef.current.position.clone();
                      const surfacePosition = planetPosition.add(new THREE.Vector3(0, 0, 2)); // 표면에 가까운 위치로 이동
                      onExplore(surfacePosition);
                    }
                  }}>
                  탐험하기
                </button>
              </div>
            </Html>
          </mesh>
        </group>
      )}
    </group>
  );
}

export default Planet;
