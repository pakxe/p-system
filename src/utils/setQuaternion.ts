import { VECTOR_3 } from '../types';
import { Mesh, Quaternion, Vector3 } from 'three';

const setQuaternion = (axis: VECTOR_3, angle: number, target: Mesh) => {
  const normalizedAxis = new Vector3(...axis).normalize();

  const quaternion = new Quaternion();
  quaternion.setFromAxisAngle(normalizedAxis, angle);
  target.quaternion.multiplyQuaternions(quaternion, target.quaternion);
};

export default setQuaternion;
