import { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import NightSky from '../components/NightSky';
import { Camera, DirectionalLightHelper, PCFSoftShadowMap, Quaternion, TextureLoader, Vector3 } from 'three';
import snowSound from '../assets/snow.mp3';
import snowSurface from '../assets/snow-surface.jpg';
import CameraMoveLittle from '../components/CameraRig';
import CameraRig from '../components/CameraRig';
import { Bloom, EffectComposer } from '@react-three/postprocessing';
import snowball from '../../public/modals/snowball.glb';
import lb from '../../public/modals/loot_box.glb';

const Snowball = () => {
  const snowballRef = useRef(); // 눈덩이 Mesh 참조
  const [velocity, setVelocity] = useState([0, 0]); // 드래그 속도 (x, z)
  const [isDragging, setIsDragging] = useState(false); // 드래그 상태
  const lastPointerPos = useRef([0, 0]); // 이전 포인터 위치
  const { camera } = useThree() as { camera: Camera };
  const [scale, setScale] = useState(1.3); // 눈덩이 크기 상태
  const [position, setPosition] = useState([0, 0.8, 0]); // 눈덩이 위치
  const { scene } = useGLTF(snowball);

  const texture = useLoader(TextureLoader, snowSurface);
  // camera.position.y = 10;
  // camera.position.z = 15;

  const handleDragStart = (event) => {
    setIsDragging(true);
    lastPointerPos.current = [event.clientX, event.clientY];
  };

  const handleDragging = (event) => {
    if (isDragging && snowballRef.current) {
      const [lastX, lastY] = lastPointerPos.current;
      const deltaX = event.clientX - lastX;
      const deltaY = event.clientY - lastY;

      lastPointerPos.current = [event.clientX, event.clientY];

      const moveAmount = Math.abs(deltaX) + Math.abs(deltaY);
      // setScale((prev) => prev + moveAmount * 0.0002);

      setVelocity([deltaX * 0.02, deltaY * 0.02]);
      setPosition((prev) => [prev[0] + deltaX * 0.015, prev[1], prev[2] + deltaY * 0.015]);
      // setPosition((prev) => [prev[0] + deltaX * 0.005, prev[1] + moveAmount * 0.0002, prev[2] + deltaY * 0.005]);

      const axis = new Vector3(deltaY, 0, -deltaX).normalize();
      const angle = (moveAmount / scale) * 0.005;

      const quaternion = new Quaternion();
      quaternion.setFromAxisAngle(axis, angle);
      snowballRef.current.quaternion.multiplyQuaternions(quaternion, snowballRef.current.quaternion);
    }
  };

  const handleDragEnd = (event) => {
    setIsDragging(false);
  };

  const audioRef = useRef(null);

  useFrame(() => {
    if (!isDragging && velocity[0] !== 0 && velocity[1] !== 0) {
      const deltaX = velocity[0];
      const deltaZ = velocity[1];
      const moveAmount = Math.abs(deltaX) + Math.abs(deltaZ);

      setPosition((prev) => [prev[0] + deltaX, prev[1], prev[2] + deltaZ]);

      setVelocity((prev) => [prev[0] * 0.8, prev[1] * 0.8]);

      if (Math.abs(velocity[0]) < 0.0001 && Math.abs(velocity[1]) < 0.0001) {
        setVelocity([0, 0]);
      }

      const axis = new Vector3(deltaZ, 0, -deltaX).normalize();
      const angle = moveAmount / scale;

      const quaternion = new Quaternion();
      quaternion.setFromAxisAngle(axis, angle);
      snowballRef.current.quaternion.multiplyQuaternions(quaternion, snowballRef.current.quaternion);
    }
  });

  const fadeOutAudio = (audio) => {
    const fadeInterval = 100; // 볼륨을 줄일 간격(ms)
    const fadeStep = 0.01; // 볼륨 감소량

    const fadeOut = setInterval(() => {
      if (audio.volume > 0) {
        audio.volume = Math.max(0, audio.volume - fadeStep); // 볼륨 감소
      } else {
        clearInterval(fadeOut); // 볼륨이 0이 되면 타이머 정리
        audio.pause(); // 소리 멈춤
      }
    }, fadeInterval);
  };

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(snowSound);
      audioRef.current.loop = true; // 소리를 반복 재생
    }

    if (isDragging) {
      audioRef.current.volume = 1;
      audioRef.current.play();
    } else {
      fadeOutAudio(audioRef.current);
    }

    return () => {
      // 컴포넌트 언마운트 시 정리
      audioRef.current?.pause();
    };
  }, [isDragging]);

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
      <primitive object={scene} />
      <sphereGeometry args={[scale, 32, 32]} />
    </mesh>
  );
};

const SnowBallPage = () => {
  const texture = useLoader(TextureLoader, snowSurface);
  const cameraRef = useRef(); // 카메라 참조

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
        position={[-1, 100, 10]} // 조명 위치
        intensity={1.5} // 조명 강도
      />
      <ambientLight intensity={0.3} /> {/* 주변광 */}
      <Snowball />
      <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial map={texture} />
      </mesh>
      <axesHelper />
      {/* <perspectiveCamera ref={cameraRef} /> */}
      <CameraRig />
      {/* <OrbitControls /> */}
      <EffectComposer>
        <Bloom kernelSize={3} luminanceThreshold={0} luminanceSmoothing={0.1} intensity={0.8} />
      </EffectComposer>
    </Canvas>
  );
};

export default SnowBallPage;
