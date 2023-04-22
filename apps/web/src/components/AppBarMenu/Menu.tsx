import { Menu } from '@headlessui/react';
import clsx from 'clsx';
import React from 'react';
import { useFragment } from '../../generated';
import { UserFragment } from '../../graphql';
import { useAuth } from '../../hooks';
import { Transition } from '../Transition';
import MenuButton from './MenuButton';
import MenuItems from './MenuItems';

export interface AppBarMenuProps {
  className?: string;
}

function AppBarMenu({ className }: AppBarMenuProps): JSX.Element {
  const { data } = useAuth();
  const me = useFragment(UserFragment, data?.me);

  if (!data || !me) {
    return <></>;
  }

  return (
    <div className={clsx(className)}>
      <Menu
        as="div"
        className="relative inline-block w-min text-left"
      >
        <MenuButton src={me.image} />
        <Transition>
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
