import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import snowSurface from '../../../assets/snow-surface.jpg';

const SnowPlane = () => {
  const texture = useLoader(TextureLoader, snowSurface);

  return (
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
      <planeGeometry args={[100, 100]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

export default SnowPlane;
