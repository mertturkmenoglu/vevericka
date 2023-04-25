import { Dispatch, SetStateAction, useEffect } from 'react';

export interface UseEmojiClickListenerOptions {
  buttonId: string;
  containerId: string;
  setShow: Dispatch<SetStateAction<boolean>>;
}

export function useEmojiClickListener({ buttonId, containerId, setShow }: UseEmojiClickListenerOptions): void {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const container = document.getElementById(containerId);
      const button = document.getElementById(buttonId);
      const el = document.elementFromPoint(event.clientX, event.clientY);

      const containerContains = container?.contains(el) ?? false;
      const buttonContains = button?.contains(el) ?? false;

      if (!containerContains && !buttonContains) {
        setShow(false);
        return;
      }

      if (buttonContains && !containerContains) {
        setShow((prev) => !prev);
        return;
      }
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [containerId, buttonId, setShow]);
}
