import * as THREE from 'three';
import { useSpring, animated } from '@react-spring/three';
import Arrow from '../../../components/Arrow';
import useDuplicatedModel from '../../../hooks/useDuplicatedModel';

type Props = {
  name: string; // glb 모델 파일명

  direction?: [number, number, number]; // 화살표 방향
  length?: number; // 화살표 길이
  color?: string; // 화살표 색상
  coneSize?: number; // 화살표 머리 크기
  arrowThickness?: number; // 화살표 줄기의 두께

  position?: [number, number, number]; // 이동 전 위치
  targetPosition?: [number, number, number]; // 이동 후 위치
  isMoved?: boolean; // 이둥 상태

  rotation?: [number, number, number]; // 회전 각도 (라디안 단위)
};

function Part({
  name,
  direction,
  length,
  position = [0, 0, 0],
  targetPosition, // 기본 목표 위치
  isMoved = false,
  rotation = [0, 0, 0],
}: Props) {
  const { clonedScene, Model } = useDuplicatedModel(name);

  const { animatedPosition } = useSpring({
    animatedPosition: isMoved ? targetPosition : position,
    config: { duration: 2000 },
  });

  if (!clonedScene) return null;

  // 모델이 0,0,0에 있지 않을 경우 box를 만들고 위치를 모방해내야함.
  const center = new THREE.Vector3();
  new THREE.Box3().setFromObject(clonedScene).getCenter(center);

  return (
    <animated.group position={animatedPosition} rotation={rotation}>
      <Model />

      {direction && length && !isMoved && <Arrow start={center} direction={direction} length={length} color={'red'} />}
    </animated.group>
  );
}

export default Part;
