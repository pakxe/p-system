import { VECTOR_3 } from '../types';
import * as THREE from 'three';

/**
 * 기준 벡터와 이동하려는 벡터를 받아 쿼터니언을 반환하는 함수
 */
const getQuaternion = (baseDirection: VECTOR_3, targetDirection: VECTOR_3) => {
  const direction = new THREE.Vector3(...targetDirection).normalize();

  const quaternion = new THREE.Quaternion();
  const defaultDirection = new THREE.Vector3(...baseDirection);
  quaternion.setFromUnitVectors(defaultDirection, direction);

  return quaternion;
};

export default getQuaternion;
