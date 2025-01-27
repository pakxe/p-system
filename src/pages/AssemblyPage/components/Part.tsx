import { useGLTF } from '@react-three/drei';

type Props = {
  name: string;
};

function Part({ name }: Props) {
  const { scene } = useGLTF(`/modals/${name}.glb`, true);

  return <primitive object={scene} />;
}

export default Part;
