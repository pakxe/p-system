import MODAL_KEYS from '../../../constants/modalKeys';
import { useModalContext } from '../../../hooks/useModal';
import ConfirmAllRequiredPartsModal from '../components/ConfirmAllRequiredPartsModal';

const useConfirmRequiredPartsModal = () => {
  const { open } = useModalContext();

  return {
    open: () =>
      open(MODAL_KEYS.CONFIRM_REQUIRED_PARTS, ({ isOpened, onClose }) => (
        <ConfirmAllRequiredPartsModal onClose={onClose} isOpened={isOpened} />
      )),
  };
};

export default useConfirmRequiredPartsModal;
