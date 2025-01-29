import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Mesh } from 'three';
import { VECTOR_3 } from '../../../types';
import useModel from '../../../hooks/useModel';
import { ThreeEvent, useFrame } from '@react-three/fiber';
import setQuaternion from '../../../utils/setQuaternion';

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
  const { Model, scene } = useModel('snowball');

  const resetSnowball = () => {
    lastPointerPos.current = DEFAULT_X_Z;
    setVelocity(DEFAULT_X_Z);
    setPosition(DEFAULT_POSITION);
    setScale(DEFAULT_SCALE);
  };

  useLayoutEffect(() => scene.traverse((o) => o.isMesh && (o.castShadow = o.receiveShadow = true)), []);

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
      <Model castShadow object={scene} scale={[scale, scale, scale]} />
    </mesh>
  );
};

export default Snowball;
