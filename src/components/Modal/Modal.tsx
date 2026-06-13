import { useEffect, useRef, type ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface ModalProps {
  isOpen: boolean;
  onCloseHandler: () => void;
  children: ReactNode;
  className?: string;
  position?: 'fixed' | 'absolute';
}

export default function Modal({ isOpen, onCloseHandler, children, className, position = 'fixed' }: ModalProps) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (isOpen) {
      if (!el.open) el.show();
    } else {
      if (el.open) el.close();
    }
  }, [isOpen]);

  const isAbsolute = position === 'absolute';

  return (
    <>
      {isOpen && (
        <div
          className={cn(
            isAbsolute ? "absolute inset-0" : "fixed inset-0",
            "z-[9998] bg-black/50 backdrop-blur-sm"
          )}
          onClick={onCloseHandler}
        />
      )}
      <dialog
        ref={ref}
        onCancel={(e) => {
          e.preventDefault();
          onCloseHandler();
        }}
        className={cn(
          isAbsolute ? "absolute" : "fixed",
          "top-1/2 left-1/2 z-[9999] m-0 -translate-x-1/2 -translate-y-1/2 overflow-visible rounded-2xl border-none bg-surface-weak p-0 shadow-default outline-none focus:outline-none",
          className
        )}
      >
        {children}
      </dialog>
    </>
  );
}
