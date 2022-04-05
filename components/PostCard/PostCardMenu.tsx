import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { BookmarkIcon, DotsVerticalIcon, FlagIcon, ShareIcon } from '@heroicons/react/outline';
import clsx from 'clsx';

export interface PostCardMenuProps {
  onShareClick: () => void;
}

const PostCardMenu: React.FC<PostCardMenuProps> = ({ onShareClick }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="">
          <span className="sr-only">Menu</span>
          <DotsVerticalIcon
            className={clsx(
              'ml-2 p-2',
              'h-8 w-8',
              'rounded-full',
              'text-primary',
              'hover:bg-primary hover:bg-opacity-10',
            )}
            aria-hidden="true"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-50 w-40 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-sm ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-neutral-700">
          <div className="px-2 py-1">
            <Menu.Item>
              {() => (
                <button
                  className="my-1 flex w-full items-center rounded-full px-2 py-1 hover:bg-primary hover:bg-opacity-10"
                  onClick={onShareClick}
                >
                  <ShareIcon className="h-4 w-4 text-primary" />
                  <span className="ml-2 text-sm font-medium text-midnight dark:text-gray-200">Share</span>
                </button>
              )}
            </Menu.Item>

            <Menu.Item>
              {() => (
                <button className="my-1 flex w-full items-center rounded-full px-2 py-1 hover:bg-primary hover:bg-opacity-10">
                  <BookmarkIcon className="h-4 w-4 text-primary" />
                  <span className="ml-2 text-sm font-medium text-midnight dark:text-gray-200">Save</span>
                </button>
              )}
            </Menu.Item>

            <Menu.Item>
              {() => (
                <button className="my-1 flex w-full items-center rounded-full px-2 py-1 hover:bg-primary hover:bg-opacity-10">
                  <FlagIcon className="h-4 w-4 text-primary" />
                  <span className="ml-2 text-sm font-medium text-midnight dark:text-gray-200">Report</span>
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default PostCardMenu;
