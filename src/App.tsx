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
import './App.css';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
// import { OrbitControls } from '@react-three/drei';
import { css } from '@emotion/react';
import * as THREE from 'three';

interface SatelliteProps {
  color: string;
  radius: number; // 위성의 궤도 반지름
  speed: number; // 위성의 회전 속도
}

function Starfield() {
  const pointsRef = useRef<THREE.Points>(null);

  useEffect(() => {
    const starCount = 10000; // 별의 개수
    const starRange = 2000; // 별이 생성될 범위

    // 별의 위치 배열 생성
    const stars = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i += 3) {
      stars[i] = (Math.random() - 0.5) * starRange; // x
      stars[i + 1] = (Math.random() - 0.5) * starRange; // y
      stars[i + 2] = (Math.random() - 0.5) * starRange; // z
    }

    // Geometry와 PointsMaterial 설정
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(stars, 3));

    const material = new THREE.PointsMaterial({
      size: 1.5, // 별 크기
      sizeAttenuation: true, // 원근 효과
      color: 'white', // 별 색상
    });

    if (pointsRef.current) {
      pointsRef.current.geometry = geometry;
      pointsRef.current.material = material;
    }
  }, []);

  return <points ref={pointsRef} />;
}

function Satellite({ planetRef, color, radius, speed }: SatelliteProps & { planetRef: React.RefObject<THREE.Mesh> }) {
  const meshRef = useRef<THREE.Mesh>(null!);
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

// Planet 컴포넌트의 타입 정의
interface PlanetProps {
  color: string;
  name: string;
  radius: number; // 궤도 반지름
  speed: number; // 회전 속도
  onClick: (position: number[]) => void;
  onHover: (name: string | null) => void;
  satellites?: SatelliteProps[]; // 위성 배열
}

// Planet 컴포넌트
function Planet({
  color,
  name,
  onClick,
  onHover,
  speed,
  radius,
  satellites,
}: PlanetProps & { onClick: (ref: React.RefObject<THREE.Mesh>) => void }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const angleRef = useRef(0); // 각도를 추적
  // 호버
  const [hovered, setHover] = useState(false);

  useFrame(() => {
    if (!meshRef.current) return;

    // 궤도를 따라 회전
    angleRef.current += speed;
    const x = radius * Math.cos(angleRef.current);
    const z = radius * Math.sin(angleRef.current);
    meshRef.current.position.set(x, 0, z);
  });

  return (
    <group>
      <mesh
        ref={meshRef}
        onClick={() => onClick(meshRef)} // 클릭 시 ref 전달
        onPointerOver={() => {
          onHover(name);
          setHover(true);
        }}
        onPointerOut={() => {
          setHover(false);
          onHover(null);
        }}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color={hovered ? 'white' : color} metalness={0.3} roughness={0.7} />
      </mesh>

      {/* 위성 렌더링 */}
      {satellites?.map((satellite, index) => (
        <group key={index}>
          <Orbit planetRef={meshRef} radius={satellite.radius} />
          <Satellite {...satellite} planetRef={meshRef} />
        </group>
      ))}
    </group>
  );
}

// Orbit 컴포넌트: 궤도 선 그리기
interface OrbitProps {
  planetRef?: React.RefObject<THREE.Mesh>; // 행성의 위치를 참조
  radius: number; // 궤도의 반지름
}

function Orbit({ planetRef, radius }: OrbitProps) {
  const lineRef = useRef<THREE.Line>(null!);

  // 궤도 점 생성 (고정된 점)
  const points = Array.from({ length: 64 }, (_, i) => {
    const angle = (i / 64) * Math.PI * 2;
    return new THREE.Vector3(radius * Math.cos(angle), 0, radius * Math.sin(angle));
  });

  const orbitGeometry = new THREE.BufferGeometry().setFromPoints(points);

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
      <Canvas
        onCreated={({ scene }) => {
          scene.background = new THREE.Color('black'); // 배경 색상 설정
        }}
        camera={{
          near: 1,
          far: 5000, // 먼 거리까지 렌더링
        }}>
        <Starfield />
        <ambientLight intensity={0.2} /> {/* 기본 조명 */}
        <pointLight position={[10, 10, 10]} intensity={1} /> {/* 방향성 조명 */}
        <directionalLight position={[-100, 10, -50]} intensity={1} /> {/* 추가 조명 */}
        {/* 행성 렌더링 */}
        {planets.map((planet, index) => (
          <group key={index}>
            <Orbit radius={planet.radius} />
            <Planet
              {...planet}
              onClick={(ref) => {
                console.log(ref);
                setTargetRef(ref); // 클릭된 행성의 ref를 설정
                setIsUserInteracting(false);
              }}
              onHover={(name) => console.log(name)}
            />
          </group>
        ))}
        <CameraMover targetRef={targetRef} isUserInteracting={isUserInteracting} />
        {/* <axesHelper args={[5]} /> */}
      </Canvas>
      {targetRef && (
        <div
          css={css`
            position: absolute;
            top: 0;
            right: 0;

            width: 200px;
            height: 100%;

            border-radius: 16px;

            background-color: rgba(255, 255, 255, 0.5);
            color: white;
          `}>
          안녕
        </div>
      )}
    </div>
  );
}

function CameraMover({
  targetRef,
  isUserInteracting,
}: {
  targetRef: React.RefObject<THREE.Mesh>;
  isUserInteracting?: boolean;
}) {
  const { camera } = useThree();
  const currentPos = useRef(camera.position.clone());
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0)); // 카메라 현재 시선
  const lerpSpeed = 0.05; // 부드러운 이동 속도
  const solarSystemViewPosition = new THREE.Vector3(15, 15, 15); // 태양계를 보는 위치 (적절히 조정 가능)
  const solarSystemLookAt = new THREE.Vector3(0, 0, 0); // 태양계를 중심으로 시선 고정

  useEffect(() => {
    camera.position.copy(solarSystemViewPosition);
    camera.lookAt(solarSystemLookAt.x, solarSystemLookAt.y, solarSystemLookAt.z);

    // Ref도 초기 위치로 설정
    currentPos.current.copy(solarSystemViewPosition);
    currentLookAt.current.copy(solarSystemLookAt);
  }, [camera]);

  useFrame(() => {
    // if (!targetRef?.current) return;

    if (isUserInteracting) {
      currentPos.current.lerp(solarSystemViewPosition, lerpSpeed);
      camera.position.copy(currentPos.current);

      currentLookAt.current.lerp(solarSystemLookAt, lerpSpeed);
      camera.lookAt(currentLookAt.current.x, currentLookAt.current.y, currentLookAt.current.z);
      return;
    }

    // 타겟 위치를 실시간으로 가져오기
    const targetPosition = targetRef.current.position;

    // 카메라 위치를 타겟 궤도로 부드럽게 이동
    const targetVector = new THREE.Vector3(targetPosition.x, targetPosition.y + 5, targetPosition.z - 10);
    currentPos.current.lerp(targetVector, lerpSpeed);
    camera.position.copy(currentPos.current);

    // 카메라의 시선을 타겟 행성으로 부드럽게 이동
    currentLookAt.current.lerp(targetPosition, lerpSpeed);
    camera.lookAt(currentLookAt.current.x - 3, currentLookAt.current.y, currentLookAt.current.z);
  });

  return null;
}

export default App;
