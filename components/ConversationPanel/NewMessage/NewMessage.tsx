import React from 'react';
import { ArrowRightIcon } from '@heroicons/react/outline';
import clsx from 'clsx';

export interface NewMessageProps {}

const NewMessage: React.FC<NewMessageProps> = () => {
  return (
    <div
      className={clsx(
        'flex items-center justify-between',
        'border-t-2 border-midnight border-opacity-10',
        'bg-white dark:bg-neutral-800',
        'px-2 py-2',
      )}
    >
      <div className="w-full">
        <input
          type="text"
          placeholder="Type a message"
          className={clsx(
            'w-full rounded-md',
            '',
            'px-4 py-1.5',
            'bg-gray-100 placeholder:text-gray-400',
            'dark:placeholder: dark:bg-neutral-700 dark:text-gray-200',
            'focus:outline-midnight',
          )}
        />
      </div>
      <div className="ml-2">
        <button className="flex items-center justify-center">
          <ArrowRightIcon className="h-6 w-6 text-midnight dark:text-white" />
        </button>
      </div>
    </div>
  );
};

export default NewMessage;
