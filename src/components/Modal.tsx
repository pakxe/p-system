import { css, useTheme } from '@emotion/react';
import { ModalProps } from '../types/modalType';
import { WithChildren } from '../types/with';
import CloseButton from './CloseButton';
import Z_INDEX from '../constants/zIndex';

const Modal = ({ onClose, isOpened, children }: WithChildren & ModalProps) => {
  if (!isOpened) return null;

  return (
    <div
      css={css`
        position: fixed;
        top: 0;
        left: 0;

        width: 100vw;
        height: 100vh;

        display: flex;
        justify-content: center;
        align-items: center;

        z-index: ${Z_INDEX.MODAL};
      `}>
      <Dimmer onClose={onClose} />
      <Content onClose={onClose}>{children}</Content>
    </div>
  );
};

const Dimmer = ({ onClose }: Pick<ModalProps, 'onClose'>) => {
  return (
    <div
      onClick={onClose}
      css={css`
        position: absolute;
        top: 0;
        left: 0;

        width: 100%;
        height: 100%;

        background-color: rgb(0, 0, 0, 0.5);
      `}
    />
  );
};

const Content = ({ children, onClose }: WithChildren & Pick<ModalProps, 'onClose'>) => {
  const theme = useTheme();

  return (
    <div
      css={css`
        width: 70%;
        height: 400px;

        display: flex;
        justify-content: start;
        flex-direction: column;

        border-radius: 16px;
        padding: 32px;

        background-color: ${theme.colors.black};

        position: relative;
      `}>
      {children}
      <CloseButton onClose={onClose} />
    </div>
  );
};

export default Modal;
