import { useGLTF } from '@react-three/drei';

type Props = {
  names: string[];
};

const PreloadModel = ({ names }: Props) => {
  names.forEach((name) => {
    useGLTF.preload(`/models/${name}.glb`);
  });

  return null;
};

export default PreloadModel;
