import * as THREE from 'three';

const calcModelCenter = (scene: THREE.Group<THREE.Object3DEventMap>) => {
  return new THREE.Box3().setFromObject(scene).getCenter(new THREE.Vector3());
};

export default calcModelCenter;
