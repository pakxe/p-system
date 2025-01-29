import { useEffect, useRef, useState } from 'react';
import { Canvas, ThreeEvent, useFrame, useLoader } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Mesh, PCFSoftShadowMap, TextureLoader } from 'three';
import snowSound from '../assets/snow.mp3';
import snowSurface from '../assets/snow-surface.jpg';
import CameraRig from '../components/CameraRig';
import snowball from '../../public/models/snowball.glb';
import setQuaternion from '../utils/setQuaternion';
// import { Bloom, EffectComposer } from '@react-three/postprocessing';

const MIN_VELOCITY = 0.0001;
const DEFAULT_X_Z = [0, 0];

const Snowball = () => {
  const snowballRef = useRef<Mesh>();

  const [isDragging, setIsDragging] = useState(false); // 드래그 상태
  const lastPointerPos = useRef(DEFAULT_X_Z);

  const [scale, setScale] = useState(1); // 눈덩이 크기 상태

  const [velocity, setVelocity] = useState(DEFAULT_X_Z); // 드래그 속도 (x, z)
  const [position, setPosition] = useState<[number, number, number]>([0, 0.8, 0]); // 눈덩이 위치
  const { scene } = useGLTF(snowball);

  const handleDragStart = (event: ThreeEvent<PointerEvent>) => {
    setIsDragging(true);

    lastPointerPos.current = [event.clientX, event.clientY];
  };

  // 드래그 중 = position, velocity 업데이트
  const handleDragging = (event: ThreeEvent<PointerEvent>) => {
    if (isDragging && snowballRef.current) {
      const [lastX, lastY] = lastPointerPos.current;
      const deltaX = event.clientX - lastX;
      const deltaZ = event.clientY - lastY;

      if (deltaX === 0 && deltaZ === 0) return; // 0,0이 교차로 찍혀 움직여지지 않을 때가 있음. 그걸 피하기 위함
      lastPointerPos.current = [event.clientX, event.clientY];

      setPosition((prev) => [prev[0] + deltaX * 0.01, prev[1], prev[2] + deltaZ * 0.01]);
      setVelocity([deltaX * 0.02, deltaZ * 0.02]);

      const moveAmount = Math.abs(deltaX) + Math.abs(deltaZ);
      setScale((prev) => prev + moveAmount * 0.0002);

      setQuaternion([deltaZ, 0, -deltaX], moveAmount * 0.005, snowballRef.current);
    }
  };

  // 드래그 끝 - 드래깅 상태 false로
  const handleDragEnd = () => {
    setIsDragging(false);
  };

  // 감속
  useFrame(() => {
    if (!isDragging && velocity[0] !== 0 && velocity[1] !== 0 && snowballRef.current) {
      const deltaX = velocity[0];
      const deltaZ = velocity[1];
      const moveAmount = Math.abs(deltaX) + Math.abs(deltaZ);
      setScale((prev) => prev + moveAmount * 0.0002);

      setPosition((prev) => [prev[0] + velocity[0], prev[1], prev[2] + velocity[1]]);
      setVelocity((prev) => [prev[0] * 0.6, prev[1] * 0.6]);

      if (Math.abs(velocity[0]) < MIN_VELOCITY && Math.abs(velocity[1]) < MIN_VELOCITY) {
        setVelocity(DEFAULT_X_Z);
      }

      setQuaternion([deltaZ, 0, -deltaX], moveAmount, snowballRef.current);
    }
  });

  // const audioRef = useRef(null);

  // const fadeOutAudio = (audio) => {
  //   const fadeInterval = 100; // 볼륨을 줄일 간격(ms)
  //   const fadeStep = 0.01; // 볼륨 감소량

  //   const fadeOut = setInterval(() => {
  //     if (audio.volume > 0) {
  //       audio.volume = Math.max(0, audio.volume - fadeStep); // 볼륨 감소
  //     } else {
  //       clearInterval(fadeOut); // 볼륨이 0이 되면 타이머 정리
  //       audio.pause(); // 소리 멈춤
  //     }
  //   }, fadeInterval);
  // };

  // useEffect(() => {
  //   if (!audioRef.current) {
  //     audioRef.current = new Audio(snowSound);
  //     audioRef.current.loop = true; // 소리를 반복 재생
  //   }

  //   if (isDragging) {
  //     audioRef.current.volume = 1;
  //     audioRef.current.play();
  //   } else {
  //     fadeOutAudio(audioRef.current);
  //   }

  //   return () => {
  //     // 컴포넌트 언마운트 시 정리
  //     audioRef.current?.pause();
  //   };
  // }, [isDragging]);

  return (
    <mesh
      castShadow
      ref={snowballRef}
      position={position}
      scale={[scale, scale, scale]}
      onPointerOut={handleDragEnd}
      onPointerDown={handleDragStart}
      onPointerMove={handleDragging}
      onPointerUp={handleDragEnd}>
      <primitive object={scene} scale={[scale, scale, scale]} />
      <sphereGeometry args={[scale + 0.2, 32, 32]} />
    </mesh>
  );
};

const SnowBallPage = () => {
  const texture = useLoader(TextureLoader, snowSurface);

  return (
    <Canvas
      shadows={{ type: PCFSoftShadowMap }}
      camera={{ position: [0, 5, 5.5], fov: 50 }}
      style={{ height: '100vh', width: '100vw' }}>
      <ambientLight intensity={0.4} />
      <directionalLight
        shadow-camera-top={25}
        shadow-camera-bottom={-25}
        shadow-camera-left={-25}
        shadow-camera-right={25}
        shadow-mapSize={2048}
        castShadow
        position={[-1, 100, 10]}
        intensity={1.5}
      />
      <ambientLight intensity={0.3} />
      <Snowball />
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial map={texture} />
      </mesh>
      <axesHelper />
      <CameraRig />
      {/* <EffectComposer>
        <Bloom kernelSize={3} luminanceThreshold={0} luminanceSmoothing={0.1} intensity={0.8} />
      </EffectComposer> */}
    </Canvas>
  );
};

export default SnowBallPage;
