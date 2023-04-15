import React, { Fragment } from 'react';
import clsx from 'clsx';
import { Menu, Transition } from '@headlessui/react';
import MenuItems from './MenuItems';
import MenuButton from './MenuButton';
import { useAuth } from '../../hooks';

export interface AppBarMenuProps {
  className?: string;
}

function AppBarMenu({ className }: AppBarMenuProps): JSX.Element {
  const { data } = useAuth();

  if (!data) {
    return <></>;
  }

  return (
    <div className={clsx(className)}>
      <Menu
        as="div"
        className="relative inline-block w-min text-left"
      >
        <MenuButton />
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
            className="absolute right-0 z-50 mt-4 w-48 origin-top-right rounded-md bg-white shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <MenuItems
              className="divide-y"
              userData={data}
            />
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

export default AppBarMenu;
