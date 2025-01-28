import { Canvas } from '@react-three/fiber';
import useDuplicatedModel from '../../../hooks/useDuplicatedModel';
import SpotCamera from './SpotCamera';
import { css } from '@emotion/react';
import { ModalProps } from '../../../types/modalType';
import calcModelSize from '../../../utils/calcModelSize';
import calcModelCenter from '../../../utils/calcModelCenter';

type Props = ModalProps & {
  name: string;
  onClose: () => void;
};

const PartDetailModal = ({ isOpen, name, onClose }: Props) => {
  const { Model, originalScene } = useDuplicatedModel(name);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      css={css`
        position: fixed;
        top: 0;
        left: 0;

        width: 100vw;
        height: 100vh;

        background-color: rgb(0, 0, 0, 0.5);
        z-index: 100;
      `}>
      <Canvas>
        <ambientLight intensity={1} />
        <directionalLight position={[10, 20, 10]} intensity={2} />
        <Model />
        <SpotCamera position={calcModelCenter(originalScene)} size={calcModelSize(originalScene)} canControls />
      </Canvas>

      <button
        onClick={onClose}
        css={css`
          position: absolute;
          top: 10px;
          right: 10px;

          background-color: white;
          border: none;
          border-radius: 5px;
          padding: 5px;
          cursor: pointer;
        `}>
        닫기s
      </button>
    </div>
  );
};

export default PartDetailModal;
