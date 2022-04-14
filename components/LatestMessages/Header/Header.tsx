import { ApplicationContext } from '@context/ApplicationContext';
import clsx from 'clsx';
import React, { useContext, useMemo } from 'react';
import { DotsVerticalIcon, PlusIcon } from '@heroicons/react/solid';
import Tooltip from '@components/Tooltip';

export interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const appContext = useContext(ApplicationContext);
  const appUser = useMemo(() => appContext.user, [appContext]);

  return (
    <>
      <div className="mx-2 flex items-center justify-between">
        <div className="flex items-center">
          <img src={appContext.user.image} alt="" className="h-12 w-12 rounded-full" />
          <div className="ml-2 flex flex-col">
            <span className="font-bold text-midnight dark:text-white">{appUser.name}</span>
            <span className="text-sm text-primary">@{appUser.username}</span>
          </div>
        </div>
        <div className="flex">
          <Tooltip text="New chat">
            <button
              className={clsx(
                'rounded-full p-2',
                'hover:bg-midnight hover:bg-opacity-10',
                'dark:hover:bg-white dark:hover:bg-opacity-10',
                'outline-midnight dark:outline-white',
              )}
            >
              <PlusIcon className="h-6 w-6 text-neutral-600 dark:text-white" />
            </button>
          </Tooltip>

          <Tooltip text="More">
            <button
              className={clsx(
                'rounded-full p-2',
                'hover:bg-midnight hover:bg-opacity-10',
                'dark:hover:bg-white dark:hover:bg-opacity-10',
                'outline-midnight dark:outline-white',
              )}
            >
              <DotsVerticalIcon className="h-6 w-6 text-neutral-600 dark:text-white" />
            </button>
          </Tooltip>
        </div>
      </div>

      <div className="mx-2 mt-4">
        <input
          type="text"
          placeholder="Search"
          className={clsx(
            'w-full rounded-full',
            'outline-midnight dark:outline-white',
            'px-4 py-1',
            'bg-gray-100 placeholder:text-gray-400',
            'dark:placeholder: dark:bg-neutral-700 dark:text-gray-200',
          )}
        />
      </div>
    </>
  );
};

export default Header;
