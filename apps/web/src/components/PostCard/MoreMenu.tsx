import { Menu } from '@headlessui/react';
import clsx from 'clsx';
import { DotsMenu } from '../DotsMenu';
import { moreMenuItems } from './data';

function MoreMenu(): JSX.Element {
  return (
    <DotsMenu>
      {moreMenuItems.map((item) => (
        <Menu.Item key={item.text}>
          {({ active }) => (
            <button
              className={clsx('flex items-center rounded px-2 py-1 transition-all duration-200', {
                'bg-midnight text-white dark:bg-neutral-600': active,
                'text-midnight dark:text-white': !active,
              })}
              onClick={item.action}
            >
              <item.icon className="h-4 w-4" />
              <span className="ml-2">{item.text}</span>
            </button>
          )}
        </Menu.Item>
      ))}
    </DotsMenu>
  );
}

export default MoreMenu;
