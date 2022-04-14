import React, { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/solid';
import clsx from 'clsx';

export interface MessagesMenuProps {}

const MessagesMenu: React.FC<MessagesMenuProps> = (props) => {
  return (
    <>
      <Menu as="div" className="relative hidden w-min text-left sm:inline-block">
        {({ open: isMenuOpen }) => (
          <>
            <Menu.Button className="m-0 flex items-center justify-center" as="div">
              <button
                className={clsx(
                  'fixed bottom-0 right-8',
                  'h-[48px] w-[400px]',
                  'shadow-xl',
                  {
                    'rounded-t-xl': !isMenuOpen,
                    'rounded-t-none': isMenuOpen,
                  },
                  {
                    'border-t border-white dark:border-black': isMenuOpen,
                    'border-none': !isMenuOpen,
                  },
                  'bg-midnight dark:bg-black',
                  'py-2 px-8',
                  'flex items-center justify-between',
                  'font-bold text-white',
                )}
              >
                <span>Messages</span>
                <ChevronUpIcon className="mt-1 h-6 w-6" />
              </button>
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                static
                className={clsx(
                  'fixed bottom-12 right-8',
                  'py-4 px-8',
                  'rounded-t-md',
                  'w-[400px]',
                  'space-y-2',
                  'bg-white dark:bg-neutral-800',
                  'text-midnight dark:text-white',
                  'flex flex-col',
                  'border-2 border-midnight',
                )}
              >
                {['Emily', 'Diana', 'Barbara'].map((name, index) => (
                  <Menu.Item key={name}>
                    {() => (
                      <>
                        <span className="mt-2 text-xl font-semibold">{name}</span>
                        {index !== [1, 2, 3].length - 1 && <hr className="border border-white" />}
                      </>
                    )}
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </>
  );
};

export default MessagesMenu;
