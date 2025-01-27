import * as THREE from 'three';
import getQuaternion from '../utils/getQuaternion';

type ArrowProps = {
  start: THREE.Vector3; // 화살표 시작 위치
  direction: [number, number, number]; // 방향
  length: number; // 화살표 길이
  color?: string; // 화살표 색상
  coneSize?: number; // 화살표 머리 크기
  arrowThickness?: number; // 기둥 두께
};

const Arrow = ({ start, direction, length, color = 'red', coneSize = 0.2, arrowThickness = 0.1 }: ArrowProps) => {
  const dir = new THREE.Vector3(...direction).normalize();
  const end = start.clone().add(dir.clone().multiplyScalar(length)); // 화살표 끝 위치
  const midPoint = start.clone().add(end).multiplyScalar(0.5); // 기둥 위치

  const quaternion = getQuaternion([0, 1, 0], direction);

  return (
    <>
      {/* 화살표 기동 */}
      <mesh position={midPoint} quaternion={quaternion}>
        <cylinderGeometry args={[arrowThickness, arrowThickness, length - coneSize]} />
        <meshBasicMaterial color={color} />
      </mesh>

      {/* 화살표 머리 */}
      <mesh position={end} quaternion={quaternion}>
        <coneGeometry args={[coneSize, coneSize * 2]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </>
  );
};

export default Arrow;
