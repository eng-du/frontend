import { useEffect } from 'react';

export function useOutsideClick<T extends HTMLElement | null>(
  ref: React.RefObject<T>,
  callback: () => void,
) {
  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (!ref.current) return;

      if (!ref.current.contains(event.target as Node)) {
        callback();
      }
    }

    document.addEventListener('pointerdown', handleClick);
    return () => {
      document.removeEventListener('pointerdown', handleClick);
    };
  }, [ref, callback]);
}
