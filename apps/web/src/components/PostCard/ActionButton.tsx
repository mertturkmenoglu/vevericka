import clsx from 'clsx';
import React from 'react';

export interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: TwIcon;
  text?: string | number;
  state?: 'active' | 'inactive';
  onClick?: () => Promise<void> | void;
}

function ActionButton({ icon: Icon, text, state = 'inactive', onClick }: ActionButtonProps): JSX.Element {
  const showText = text !== 0 && text !== undefined;
  return (
    <button
      className={clsx(
        'flex items-center space-x-1 rounded-md px-2 py-1 hover:bg-midnight/10 dark:hover:bg-neutral-600',
        {
          'text-midnight dark:text-neutral-400': state === 'inactive',
          'text-berry': state === 'active',
        }
      )}
      onClick={onClick}
    >
      <Icon className="h-4 w-4" />
      {showText && <span className="text-sm">{text}</span>}
    </button>
  );
}

export default ActionButton;
