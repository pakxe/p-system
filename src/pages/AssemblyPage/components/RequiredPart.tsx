import { Canvas } from '@react-three/fiber';
import useDuplicatedModel from '../../../hooks/useDuplicatedModel';
import * as THREE from 'three';
import SpotCamera from './SpotCamera';
import { EffectComposer, Outline } from '@react-three/postprocessing';
import { useState } from 'react';
import usePartDetailModal from '../hooks/usePartDetailModal';
import calcModelSize from '../../../utils/calcModelSize';
import { css, useTheme } from '@emotion/react';
import Text from '../../../components/Text';
import calcModelCenter from '../../../utils/calcModelCenter';

type Props = {
  name: string;
};

const RequiredPart = ({ name }: Props) => {
  const { Model, originalScene } = useDuplicatedModel(name, 1);

  const [isHovered, setIsHovered] = useState(false);
  const { open } = usePartDetailModal(name);

  const theme = useTheme();

  return (
    <div>
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
        <SpotCamera position={calcModelCenter(originalScene)} size={calcModelSize(originalScene)} />

        {/* 테두리 */}
        {isHovered && (
          <EffectComposer autoClear={false}>
            <Outline selectionLayer={1} visibleEdgeColor={0xffffff} kernelSize={7} />
          </EffectComposer>
        )}
      </Canvas>
      {isHovered && (
        <Text
          color='white'
          cssProp={css`
            position: absolute;

            background-color: ${theme.colors.float};

            padding: 8px;
            border-radius: 8px;

            z-index: 10;
          `}>
          {name}
        </Text>
      )}
    </div>
  );
};

export default RequiredPart;
