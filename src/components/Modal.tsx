import { useEffect, useRef, type ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onCloseHandler: () => void;
  children: ReactNode;
}

export default function Modal({ isOpen, onCloseHandler, children }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (isOpen) {
      if (!el.open) el.showModal();
    } else {
      if (el.open) el.close();
    }
  }, [isOpen]);

  const backdropClickHandler = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget) {
      onCloseHandler();
    }
  };

  return (
    <dialog
      ref={ref}
      onClick={backdropClickHandler}
      onCancel={(e) => {
        e.preventDefault();
        onCloseHandler();
      }}
      className="backdrop:bg-black/50 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-surface-weak shadow-default outline-none backdrop:backdrop-blur-sm focus:outline-none overflow-visible"
    >
      {children}
    </dialog>
  );
}
