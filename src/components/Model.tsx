import { useGLTF } from '@react-three/drei';
import modelSrc from '../../public/modals/low_poly_planet_earth.glb'; // 정적 import말고는 아직 방법 못찾음
import first from '../../public/modals/first_planet.glb'; // 정적 import말고는 아직 방법 못찾음
import stone from '../../public/modals/stone_planet.glb'; // 정적 import말고는 아직 방법 못찾음
import lava2 from '../../public/modals/lava2.glb'; // 정적 import말고는 아직 방법 못찾음
import obja from '../../public/modals/lava_obj.obj'; // 정적 import말고는 아직 방법 못찾음
import lb from '../../public/modals/loot_box.glb'; // 정적 import말고는 아직 방법 못찾음
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { useLoader } from '@react-three/fiber';

// TODO: 하드코딩이라 리펙 필요
function Model() {
  // const modelFiles = import.meta.glob('/public/modals/*.glb');
  // const importFunction = modelFiles[`/public/modals/${fileName}`];

  const { scene } = useGLTF(first);
  return <primitive object={scene} />;

  // const obj = useLoader(OBJLoader, obja);
  // return <primitive object={obj} />;
}

export default Model;
