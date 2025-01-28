import { useGLTF } from '@react-three/drei';
import { useEffect, useState } from 'react';
import { Object3D } from 'three';
/**
 * three에서는 모델 하나를 참조해서 사용하기 떄문에 중복 모델을 만들기 위해선 clone을 해야한다.
 * 그걸 쉽게 하기 위한 커스텀 훅
 */
const useDuplicatedModel = (name: string) => {
  const { scene: originalScene } = useGLTF(`/models/${name}.glb`);
  const [clonedScene, setClonedScene] = useState<Object3D | null>(null);

  useEffect(() => {
    const sceneClone = originalScene.clone();
    setClonedScene(sceneClone);
  }, [originalScene]);

  return {
    Model: (props: any) => (clonedScene ? <primitive object={clonedScene} {...props} /> : null),
    originalScene,
    clonedScene,
  };
};

export default useDuplicatedModel;
