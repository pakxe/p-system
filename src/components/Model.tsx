import { useGLTF } from '@react-three/drei';

type Props = {
  name: string;
};

function Model({ name }: Props) {
  const { scene } = useGLTF(`/models/${name}.glb`, true);

  return <primitive object={scene} />;
}

export default Model;
