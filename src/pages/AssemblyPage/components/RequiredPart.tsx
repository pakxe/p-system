import { Canvas } from '@react-three/fiber';
import useDuplicatedModel from '../../../hooks/useDuplicatedModel';
import * as THREE from 'three';
import SingleCamera from './SingleCamera';
import { EffectComposer, Outline } from '@react-three/postprocessing';
import { useState } from 'react';
import usePartDetailModal from '../hooks/usePartDetailModal';

type Props = {
  name: string;
};

const RequiredPart = ({ name }: Props) => {
  const { Model, originalScene } = useDuplicatedModel(name);
  const center = new THREE.Box3().setFromObject(originalScene).getCenter(new THREE.Vector3());
  const boundingBox = new THREE.Box3().setFromObject(originalScene);
  const size = new THREE.Vector3();
  boundingBox.getSize(size);

  const [isHovered, setIsHovered] = useState(false);
  const { open } = usePartDetailModal(name);

  return (
    <>
      <Canvas
        style={{
          width: '100px',
          height: '100px',
        }}
        onPointerOver={() => setIsHovered(true)} // 마우스 호버
        onPointerOut={() => setIsHovered(false)} // 마우스 벗어남
        onClick={open}>
        <ambientLight intensity={1} />
        <directionalLight position={[10, 20, 10]} intensity={2} />
        <Model />
        <SingleCamera position={center} size={size.length()} />

        {/* 테두리 */}
        {isHovered && (
          <EffectComposer autoClear={false}>
            <Outline selectionLayer={1} visibleEdgeColor={0xffffff} kernelSize={7} />
          </EffectComposer>
        )}
      </Canvas>
    </>
  );
};

export default RequiredPart;
