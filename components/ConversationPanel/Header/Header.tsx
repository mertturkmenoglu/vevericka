import React from 'react';
import clsx from 'clsx';
import { DotsVerticalIcon } from '@heroicons/react/outline';
import Tooltip from '@components/Tooltip';

export interface HeaderProps {
  chat: any;
}

const Header: React.FC<HeaderProps> = ({ chat }) => {
  return (
    <div
      className={clsx(
        'flex items-center justify-between',
        'border-b-2',
        'border-midnight border-opacity-10',
        'bg-white dark:bg-neutral-800',
        'px-2 py-2',
      )}
    >
      <div className="flex items-center">
        <img src={chat.image} className="h-12 w-12 rounded-full" alt="" />
        <div className="ml-2">
          <span className="text-xl font-medium text-midnight dark:text-white">{chat.name}</span>
        </div>
      </div>
      <div className="flex items-center">
        <Tooltip text="More">
          <button
            className={clsx(
              'group',
              'flex items-center justify-center',
              'rounded-full',
              'bg-transparent',
              'p-1.5',
              'hover:bg-primary hover:bg-opacity-80 dark:hover:bg-primary',
              'transition duration-200 ease-in-out',
              'outline-primary',
            )}
          >
            <DotsVerticalIcon className="h-4 w-4 text-midnight group-hover:text-white dark:text-white" />
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default Header;
