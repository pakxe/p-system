import * as THREE from 'three';
import { useSpring, animated } from '@react-spring/three';
import Arrow from '../../../components/Arrow';
import useDuplicatedModel from '../../../hooks/useDuplicatedModel';
import { VECTOR_3 } from '../../../types';
import isAllZero from '../../../utils/isAllZero';

type Props = {
  name: string; // glb 모델 파일명

  direction?: VECTOR_3; // 화살표 방향
  length?: number; // 화살표 길이
  color?: string; // 화살표 색상
  coneSize?: number; // 화살표 머리 크기
  arrowThickness?: number; // 화살표 줄기의 두께

  position?: VECTOR_3; // 이동 전 위치
  targetPosition?: VECTOR_3; // 이동 후 위치
  isMoved?: boolean; // 이둥 상태

  rotation?: VECTOR_3; // 회전 각도 (라디안 단위)
};

function Part({
  name,
  direction,
  length,
  position = [0, 0, 0],
  targetPosition = [0, 0, 0],
  isMoved = false,
  rotation = [0, 0, 0],
}: Props) {
  const { clonedScene, Model, originalScene } = useDuplicatedModel(name);

  const { animatedPosition } = useSpring({
    animatedPosition: isMoved ? targetPosition : position,
    config: { duration: 1000 },
  });

  if (!clonedScene) return null;

  return (
    <animated.group position={animatedPosition} rotation={rotation}>
      <Model />

      {direction && length && !isMoved && (
        <Arrow
          start={
            isAllZero(targetPosition)
              ? new THREE.Box3().setFromObject(originalScene).getCenter(new THREE.Vector3())
              : new THREE.Vector3(0, 0, 0)
          }
          direction={direction}
          length={length}
          color={'red'}
        />
      )}
    </animated.group>
  );
}

export default Part;
