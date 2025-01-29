import { useEffect, useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { PerspectiveCamera, Vector3 } from 'three';
import { VECTOR_3 } from '../../../types';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

type Props = {
  cameraPosition: VECTOR_3;
};

const StepCamera = ({ cameraPosition }: Props) => {
  const [isCameraMoving, setIsCameraMoving] = useState(false);

  const { camera } = useThree(); // Three.js 카메라 및 렌더러 가져오기

  const lerpSpeed = 0.08;
  const threshold = 0.1;

  // 카메라 위치 조정용 ref
  const adjustCameraPosition = useRef(new THREE.Vector3(cameraPosition[0], cameraPosition[1], cameraPosition[2]));

  useEffect(() => {
    setIsCameraMoving(true);

    // 화면 크기에 따라 거리 조정
    const width = window.innerWidth;
    const distanceMultiplier = width > 1200 ? 1 : width > 800 ? 1.5 : 2;

    const adjustedPosition = {
      x: cameraPosition[0] * distanceMultiplier,
      y: cameraPosition[1] * distanceMultiplier,
      z: cameraPosition[2] * distanceMultiplier,
    };

    adjustCameraPosition.current.set(adjustedPosition.x, adjustedPosition.y, adjustedPosition.z);
  }, [cameraPosition]);

  useFrame(() => {
    if (!isCameraMoving) return;

    // 카메라 위치 보간
    camera.position.lerp(adjustCameraPosition.current, lerpSpeed);
    const target = camera.clone();
    target.lookAt(0, 0, 0);
    camera.quaternion.slerp(target.quaternion, 0.9);

    // 목표 위치에 근접하면 이동 중단
    if (camera.position.distanceTo(adjustCameraPosition.current) < threshold) {
      camera.position.copy(adjustCameraPosition.current);
      setIsCameraMoving(false);
    }
  });

  return !isCameraMoving ? <OrbitControls target={[0, 0, 0]} /> : null;
};

export default StepCamera;
