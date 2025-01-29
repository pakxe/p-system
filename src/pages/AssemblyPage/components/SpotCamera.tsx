import { OrbitControls } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import { PerspectiveCamera } from 'three';
import * as THREE from 'three';

type Props = {
  position: THREE.Vector3;
  size: number;
  canControls?: boolean;
};

const SpotCamera = ({ position, size, canControls }: Props) => {
  const { camera }: { camera: PerspectiveCamera } = useThree();

  const distance = size / 2;

  camera.position.set(position.x + distance, position.y + distance, position.z + distance);
  camera.lookAt(position);

  return canControls ? <OrbitControls target={position} /> : null;
};

export default SpotCamera;
