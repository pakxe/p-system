import { useEffect, useRef, useState } from 'react';
import { Canvas, ThreeEvent, useFrame, useLoader } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import { Mesh, PCFSoftShadowMap, TextureLoader } from 'three';
import snowSound from '../assets/snow.mp3';
import snowSurface from '../assets/snow-surface.jpg';
import CameraRig from '../components/CameraRig';
import snowball from '../../public/models/snowball.glb';
import setQuaternion from '../utils/setQuaternion';
import Button from '../components/Button';
import { css } from '@emotion/react';
import { VECTOR_3 } from '../types';
import Snowfall from '../components/SnowFall';
import { Bloom, EffectComposer } from '@react-three/postprocessing';

const MIN_VELOCITY = 0.0001;
const DEFAULT_X_Z = [0, 0];
const DEFAULT_POSITION: VECTOR_3 = [0, 0.8, 0];
const DEFAULT_SCALE = 1;
type Props = {
  triggerReset: boolean;
};

const Snowball = ({ triggerReset }: Props) => {
  const snowballRef = useRef<Mesh>();

  const [isDragging, setIsDragging] = useState(false); // 드래그 상태
  const lastPointerPos = useRef(DEFAULT_X_Z);

  const [scale, setScale] = useState(DEFAULT_SCALE); // 눈덩이 크기 상태

  const [velocity, setVelocity] = useState(DEFAULT_X_Z); // 드래그 속도 (x, z)
  const [position, setPosition] = useState<VECTOR_3>([0, 0.8, 0]); // 눈덩이 위치
  const { scene } = useGLTF(snowball);

  const resetSnowball = () => {
    lastPointerPos.current = DEFAULT_X_Z;
    setVelocity(DEFAULT_X_Z);
    setPosition(DEFAULT_POSITION);
    setScale(DEFAULT_SCALE);
  };

  useEffect(() => resetSnowball, [triggerReset]);
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
      setScale((prev) => prev + moveAmount * 0.0001);

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
  const [triggerReset, setTriggerReset] = useState(false); // 값을 바꿀 때마다 초기화한다

  return (
    <>
      <Canvas
        shadows={{ type: PCFSoftShadowMap }}
        camera={{ position: [0, 5, 5.5], fov: 50 }}
        style={{ height: '100vh', width: '100vw' }}>
        <ambientLight intensity={0.2} /> {/* 주변 조명을 어둡게 */}
        <directionalLight
          shadow-camera-top={25}
          shadow-camera-bottom={-25}
          shadow-camera-left={-25}
          shadow-camera-right={25}
          shadow-mapSize={2048}
          castShadow
          position={[-1, 50, 20]} // 하늘에서 비추는 느낌
          intensity={1.2} // 기본 조명보다 약간 어둡게
          color={'#84a4e5'} // 파란빛 (밤하늘 느낌)
        />
        {/* 주변을 은은하게 비추는 조명 */}
        <pointLight position={[0, 30, 0]} intensity={10} color={'#f88a72'} distance={100} decay={0.8} />
        <fog attach='fog' args={['#0a0a1a', 10, 80]} />
        <Snowball triggerReset={triggerReset} />
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial map={texture} />
        </mesh>
        <Snowfall />
        <CameraRig />
      </Canvas>
      <div
        css={css`
          position: absolute;
          right: 0;
          bottom: 0;

          margin: 16px;
        `}>
        <Button onClick={() => setTriggerReset((p) => !p)}>눈덩이 초기화</Button>
      </div>
    </>
  );
};

export default SnowBallPage;
