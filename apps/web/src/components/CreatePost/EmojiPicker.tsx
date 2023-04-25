import { FaceSmileIcon } from '@heroicons/react/24/outline';
import EmojiPickerComponent, { EmojiClickData, Theme } from 'emoji-picker-react';
import React, { useId } from 'react';
import { useTheme } from '../../hooks';
import { useEmojiClickListener } from './useEmojiClickListener';

export interface EmojiPickerProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  onEmojiClick: (emoji: EmojiClickData, event: MouseEvent) => void;
}

function EmojiPicker({ show, setShow, onEmojiClick }: EmojiPickerProps): JSX.Element {
  const [theme] = useTheme();
  const containerId = useId();
  const buttonId = useId();

  useEmojiClickListener({
    buttonId,
    containerId,
    setShow,
  });

  return (
    <div className="relative">
      <button
        type="button"
        id={buttonId}
        className="group flex items-center rounded-full px-2 py-2 transition duration-200 ease-in-out hover:bg-berry/10"
      >
        <FaceSmileIcon className="h-5 w-5 text-berry" />
      </button>
      {show && (
        <div
          className="absolute left-0 top-12"
          id={containerId}
        >
          <EmojiPickerComponent
            theme={theme === 'dark' ? Theme.DARK : Theme.LIGHT}
            lazyLoadEmojis={true}
            onEmojiClick={onEmojiClick}
          />
        </div>
      )}
    </div>
  );
}

export default EmojiPicker;
