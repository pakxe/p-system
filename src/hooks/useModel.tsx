import { useGLTF } from '@react-three/drei';

const useModel = (name: string) => {
  const { scene } = useGLTF(`/models/${name}.glb`);

  return {
    Model: (props: any) => (scene ? <primitive object={scene} {...props} /> : null),
    scene,
  };
};

export default useModel;
