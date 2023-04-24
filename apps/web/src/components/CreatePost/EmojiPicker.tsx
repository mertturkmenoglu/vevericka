import { FaceSmileIcon } from '@heroicons/react/24/outline';
import EmojiPickerComponent, { EmojiClickData, Theme } from 'emoji-picker-react';
import React from 'react';
import { useTheme } from '../../hooks';

export interface EmojiPickerProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  onEmojiClick: (emoji: EmojiClickData, event: MouseEvent) => void;
}

function EmojiPicker({ show, setShow, onEmojiClick }: EmojiPickerProps): JSX.Element {
  const [theme] = useTheme();

  return (
    <button
      type="button"
      className="group relative flex items-center rounded-full px-2 py-2 transition duration-200 ease-in-out hover:bg-berry/10"
      onClick={() => setShow((prev) => !prev)}
    >
      <FaceSmileIcon className="h-5 w-5 text-berry" />
      {show && (
        <div className="absolute left-0 top-12">
          <EmojiPickerComponent
            theme={theme === 'dark' ? Theme.DARK : Theme.LIGHT}
            lazyLoadEmojis={true}
            onEmojiClick={onEmojiClick}
          />
        </div>
      )}
    </button>
  );
}

export default EmojiPicker;
