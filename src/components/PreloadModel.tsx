import { useGLTF } from '@react-three/drei';

type Props = {
  name: string;
};

const PreloadModel = ({ name }: Props) => {
  useGLTF(`/models/${name}.glb`);

  return null;
};

export default PreloadModel;
