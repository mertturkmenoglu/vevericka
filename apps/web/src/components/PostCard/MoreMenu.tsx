import { Menu, Transition } from '@headlessui/react';
import { EllipsisHorizontalIcon, FlagIcon, NoSymbolIcon, UserMinusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

const items = [
  {
    action: 'Unfollow',
    url: '#',
    icon: UserMinusIcon,
  },
  {
    action: 'Block',
    url: '#',
    icon: NoSymbolIcon,
  },
  {
    action: 'Report',
    url: '#',
    icon: FlagIcon,
  },
];

function MoreMenu(): JSX.Element {
  return (
    <Menu
      as="div"
      className="relative inline-block w-min text-left"
    >
      <Menu.Button className="flex items-center space-x-2 rounded-md py-1 px-2 hover:bg-midnight/10">
        <EllipsisHorizontalIcon className="h-5 w-5 text-midnight" />
        <span className="text-sm text-midnight">More</span>
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
          className="absolute right-0 z-50 mt-2 flex w-32 origin-top-right flex-col space-y-2 rounded bg-white p-2 shadow ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          {items.map((item) => (
            <Menu.Item>
              {({ active }) => (
                <Link
                  className={clsx('flex items-center rounded px-2 py-1 text-midnight transition-all duration-200', {
                    'bg-midnight text-white': active,
                  })}
                  to={item.url}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="ml-2">{item.action}</span>
                </Link>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default MoreMenu;
