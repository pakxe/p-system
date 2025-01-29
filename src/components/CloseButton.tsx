import { css } from '@emotion/react';
import Button from './Button';

type Props = {
  onClose: () => void;
};

const CloseButton = ({ onClose }: Props) => {
  return (
    <Button
      onClick={onClose}
      css={css`
        position: absolute;
        top: 10px;
        right: 10px;
      `}>
      x
    </Button>
  );
};

export default CloseButton;
