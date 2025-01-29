import { createContext, ReactNode, useContext, useState } from 'react';
import MODAL_KEYS from '../constants/modalKeys';
import { ModalProps } from '../types/modalType';

const ModalContext = createContext<ReturnType<typeof useModal> | null>(null);

type ModalKey = (typeof MODAL_KEYS)[keyof typeof MODAL_KEYS];
type Modal = {
  id: ModalKey;
  isOpen: boolean;
  cb: ({ isOpened, onClose }: ModalProps) => React.JSX.Element;
};

const useModal = () => {
  const [modals, setModals] = useState<Map<ModalKey, Modal>>(new Map());

  const open = (key: ModalKey, cb: ({ isOpened, onClose }: ModalProps) => React.JSX.Element) => {
    setModals((prev) => {
      const newModals = new Map(prev);
      newModals.set(key, { id: key, isOpen: true, cb });
      return newModals;
    });
  };

  const close = (key: ModalKey) => {
    if (!modals.has(key)) return;

    setModals((prev) => {
      const newModals = new Map(prev);
      const modal = newModals.get(key);
      if (modal) {
        modal.isOpen = false;
        // modal.cb({ isOpened: modal.isOpen, onClose: () => close(key) });
      }
      return newModals;
    });
  };

  return {
    modals: modals,
    open,
    close,
  };
};

const useModalContext = () => {
  const context = useContext(ModalContext);

  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }

  return context;
};

const ModalProvider = ({ children }: { children: ReactNode }) => {
  const values = useModal();

  return (
    <ModalContext.Provider value={{ ...values }}>
      {Array.from(values.modals).map(
        ([key, value]) => value.isOpen && value.cb({ isOpened: value.isOpen, onClose: () => values.close(key) }),
      )}
      {children}
    </ModalContext.Provider>
  );
};

export { ModalProvider, useModalContext };
