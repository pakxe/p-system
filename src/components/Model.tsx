import { useGLTF } from '@react-three/drei';
import modelSrc from '../../public/modals/low_poly_planet_earth.glb'; // 정적 import말고는 아직 방법 못찾음

// TODO: 하드코딩이라 리펙 필요
function Model() {
  const { scene } = useGLTF(modelSrc);
  return <primitive object={scene} />;
}

export default Model;
