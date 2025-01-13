// function Box(props: ThreeElements['mesh']) {
//   const meshRef = useRef<THREE.Mesh>(null!);
//   const [hovered, setHover] = useState(false);
//   const [active, setActive] = useState(false);
//   useFrame((state, delta) => (meshRef.current.rotation.x += delta));
//   return (
//     <mesh
//       {...props}
//       ref={meshRef}
//       scale={active ? 1.5 : 1}
//       onClick={(event) => setActive(!active)}
//       onPointerOver={(event) => setHover(true)}
//       onPointerOut={(event) => setHover(false)}>
//       <boxGeometry args={[1, 1, 1]} />
//       <meshStandardMaterial color={hovered ? 'hotpink' : '#2f74c0'} />
//     </mesh>
//   );
// }

import { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { css } from '@emotion/react';
import * as THREE from 'three';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import ExpandingCircle from './components/ExpandingCircle';
import SkyDome from './components/SkyDome';
import { SatelliteProps } from './components/Satellite';
import Orbit from './components/Orbit';
import Planet from './components/Planet';
import CameraMover from './components/CameraMover';
import Stars from './components/Stars';

// planet 데이터의 타입 정의
type PlanetData = {
  name: string;
  color: string;
  radius: number; // 궤도 반지름
  speed: number; // 회전 속도
  satellites?: SatelliteProps[]; // 위성 배열
};

// App 컴포넌트
function App() {
  const [targetRef, setTargetRef] = useState<React.RefObject<THREE.Mesh> | null>(null);
  const [isUserInteracting, setIsUserInteracting] = useState(true); // 사용자 조작 여부 상태
  const [targetName, setTargetName] = useState<string | null>(null); // 클릭된 행성 이름
  const [exploreTarget, setExploreTarget] = useState<THREE.Vector3 | null>(null);

  const planets: PlanetData[] = [
    { name: 'Mercury', color: 'gray', radius: 3, speed: 0.02 },
    { name: 'Venus', color: 'yellow', radius: 5, speed: 0.015 },
    {
      name: 'Earth',
      color: 'blue',
      radius: 7,
      speed: 0.01,
      satellites: [
        { color: 'gray', radius: 2, speed: 0.02 },
        { color: 'white', radius: 3, speed: 0.015 },
      ],
    },
    { name: 'Mars', color: 'red', radius: 9, speed: 0.008 },
    { name: 'Jupiter', color: 'pink', radius: 11, speed: 0.005 },
  ];

  useEffect(() => {
    if (isUserInteracting) {
      setTargetRef(null); // 사용자 조작 중에는 타겟을 null로 설정
      setTargetName(null);
    }
  }, [isUserInteracting]);

  return (
    <div
      css={css`
        width: 100vw;
        height: 100vh;
        position: relative;
      `}
      onWheel={() => {
        setIsUserInteracting(true);
      }}>
      {exploreTarget && <ExpandingCircle color={planets.find((planet) => planet.name === targetName)?.color} />}

      <Canvas
        onCreated={({ scene }) => {
          // CanvasTexture를 배경으로 설정
          // const gradientTexture = createGradientTexture();
          // scene.background = gradientTexture;
        }}
        camera={{
          near: 1,
          far: 5000, // 먼 거리까지 렌더링
        }}>
        <SkyDome />
        <Stars />
        <ambientLight intensity={1} /> {/* 기본 조명 */}
        <pointLight position={[10, 10, 10]} intensity={1} /> {/* 방향성 조명 */}
        <directionalLight position={[-100, 10, -50]} intensity={1} /> {/* 추가 조명 */}
        {/* 행성 렌더링 */}
        {planets.map((planet, index) => (
          <group key={index}>
            <Orbit radius={planet.radius} />
            <Planet
              {...planet}
              onExplore={(position) => setExploreTarget(position)} // 탐험하기 버튼 클릭 처리
              onClick={(ref) => {
                setExploreTarget(null);
                setTargetRef(ref); // 클릭된 행성의 ref를 설정
                setIsUserInteracting(false);
                setTargetName(planet.name);
              }}
              targetName={targetName}
              onHover={(name) => console.log(name)}
            />
          </group>
        ))}
        <CameraMover exploreTarget={exploreTarget} targetRef={targetRef} isUserInteracting={isUserInteracting} />
        {/* <axesHelper args={[5]} /> */}
        <EffectComposer>
          <Bloom
            intensity={0.3} // Bloom 강도
            luminanceThreshold={0.7} // 빛나는 영역의 밝기 임계값
            luminanceSmoothing={0.5} // 부드럽게 만드는 정도
          />
        </EffectComposer>
      </Canvas>
      <button
        css={css`
          position: absolute;
          top: 20px;
          right: 20px;

          z-index: 100;
        `}
        onClick={() => {
          setExploreTarget(null);
          setTargetRef(null);
          setIsUserInteracting(true);
        }}>
        system으로 돌아가기
      </button>
    </div>
  );
}

export default App;
