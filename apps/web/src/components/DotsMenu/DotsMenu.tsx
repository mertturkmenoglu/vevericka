import { Menu } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { Transition } from '../Transition';

export interface DotsMenuProps {
  children: React.ReactNode;
}

function DotsMenu({ children }: DotsMenuProps): JSX.Element {
  return (
    <Menu
      as="div"
      className="relative inline-block w-min text-left"
    >
      <Menu.Button className="group flex items-center space-x-2 rounded-full px-2 py-2 transition ease-in-out hover:bg-berry/10">
        <EllipsisVerticalIcon className="h-5 w-5 text-midnight group-hover:text-berry" />
      </Menu.Button>
      <Transition>
        <Menu.Items
          static
          className="absolute right-0 z-50 mt-2 flex w-40 origin-top-right flex-col space-y-2 rounded bg-white p-2 shadow ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          {children}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default DotsMenu;
