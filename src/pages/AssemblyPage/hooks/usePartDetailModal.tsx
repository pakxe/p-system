import MODAL_KEYS from '../../../constants/modalKeys';
import { useModalContext } from '../../../hooks/useModal';
import PartDetailModal from '../components/PartDetailModal';

const usePartDetailModal = (name: string) => {
  const { open } = useModalContext();
  return {
    open: () =>
      open(MODAL_KEYS.ASSEMBLY_PART_DETAIL_INFO, ({ isOpened, onClose }) => (
        <PartDetailModal isOpened={isOpened} onClose={onClose} name={name} />
      )),
  };
};

export default usePartDetailModal;
