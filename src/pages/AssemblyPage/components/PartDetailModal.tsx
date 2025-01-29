import { Canvas } from '@react-three/fiber';
import useDuplicatedModel from '../../../hooks/useDuplicatedModel';
import SpotCamera from './SpotCamera';
import { css, useTheme } from '@emotion/react';
import { ModalProps } from '../../../types/modalType';
import calcModelSize from '../../../utils/calcModelSize';
import calcModelCenter from '../../../utils/calcModelCenter';
import Text from '../../../components/Text';
import CloseButton from '../../../components/CloseButton';

type Props = ModalProps & {
  name: string;
  onClose: () => void;
};

const PartDetailModal = ({ isOpened, name, onClose }: Props) => {
  const { Model, originalScene } = useDuplicatedModel(name);
  const theme = useTheme();

  if (!isOpened) {
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
      <div
        css={css`
          width: 100%;

          display: flex;
          justify-content: center;

          margin-top: 40px;
          padding: 16px;
          background-color: ${theme.colors.black};
        `}>
        <Text color='white' size={32} weight={700}>
          {name}
        </Text>
      </div>
      <Canvas>
        <ambientLight intensity={1} />
        <directionalLight position={[10, 20, 10]} intensity={2} />
        <Model />
        <SpotCamera position={calcModelCenter(originalScene)} size={calcModelSize(originalScene)} canControls />
      </Canvas>

      <CloseButton onClose={onClose} />
    </div>
  );
};

export default PartDetailModal;
