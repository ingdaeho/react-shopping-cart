import { useCallback, useRef, useState } from 'react';
import useClickAway from './useClickAway';

export const useModal = () => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isOpen, setOpen] = useState(false);

  const openModal = useCallback(() => {
    setOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setOpen(false);
  }, []);

  useClickAway(modalRef, closeModal);

  return {
    modalRef,
    isOpen,
    openModal,
    closeModal,
  };
};
