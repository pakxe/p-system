import { useFrame } from '@react-three/fiber';
import { easing } from 'maath';

function CameraRig() {
  useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [-1 + (state.pointer.x * state.viewport.width) / 3, 15 + state.pointer.y / 2, 15],
      0.8,
      delta,
    );
    state.camera.lookAt(0, 0, 0);
  });

  return null;
}

export default CameraRig;
