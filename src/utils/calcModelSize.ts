import * as THREE from 'three';

const calcModelSize = (scene: THREE.Group<THREE.Object3DEventMap>) => {
  const boundingBox = new THREE.Box3().setFromObject(scene);
  const size = new THREE.Vector3();
  boundingBox.getSize(size);

  return size.length();
};

export default calcModelSize;
