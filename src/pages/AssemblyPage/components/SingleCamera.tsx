import { OrbitControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { PerspectiveCamera } from 'three';
import * as THREE from 'three';

type Props = {
  position: THREE.Vector3;
  size: number;
  canControls?: boolean;
};

const SingleCamera = ({ position, size, canControls }: Props) => {
  const { camera }: { camera: PerspectiveCamera } = useThree();

  const distance = size / 2;

  // 포지션에서 +z, +y, +x방향으로 20씩 떨어진 위치에서 본다,
  camera.position.set(position.x + distance, position.y + distance, position.z + distance);
  camera.lookAt(position);

  return canControls ? <OrbitControls target={position} /> : null;
};

export default SingleCamera;
