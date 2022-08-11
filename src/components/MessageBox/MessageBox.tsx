import { Avatar } from '@atom/Avatar';
import { Menu, Transition } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import React, { Fragment } from 'react';

function MessageBox(): JSX.Element {
  return (
    <Menu
      as="div"
      className="relative hidden w-min text-left sm:inline-block"
    >
      {({ open: isMenuOpen }) => (
        <>
          <Menu.Button
            className="m-0 flex items-center justify-center"
            as="div"
          >
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
                  'border-t border-white dark:border-none': isMenuOpen,
                  'border-none': !isMenuOpen,
                },
                'bg-midnight dark:bg-paper-600',
                'py-2 px-8',
                'flex items-center justify-between',
                'font-bold text-white'
              )}
            >
              <span>Messages</span>
              <ChevronUpIcon className="mt-1 h-8 w-8 font-bold text-primary" />
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
                'py-4 px-2',
                'rounded-t-md',
                'w-[400px]',
                'space-y-1',
                'bg-white dark:bg-neutral-800',
                'text-midnight dark:text-white',
                'flex flex-col',
                'mb-0.5 border-2 border-midnight dark:border-none'
              )}
            >
              {[
                { name: 'Emily', avatar: 'https://i.pravatar.cc/48' },
                { name: 'Diana', avatar: 'https://i.pravatar.cc/48' },
                { name: 'Barbara', avatar: 'https://i.pravatar.cc/48' },
              ].map(({ name, avatar }) => (
                <Menu.Item key={name}>
                  {() => (
                    <>
                      <button className="flex items-center rounded-xl px-4 py-1 text-xl font-semibold hover:bg-paper-100 dark:hover:bg-paper-500">
                        <Avatar
                          src={avatar}
                          appearance="circle"
                          label={name}
                          size="medium"
                        />
                        <span className="ml-4">{name}</span>
                      </button>
                    </>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
}

export default MessageBox;
