import { Menu } from '@headlessui/react';
import clsx from 'clsx';
import { PostItemFragment } from '../../generated/graphql';
import { DotsMenu } from '../DotsMenu';
import { useMenuItems } from './useMenuItems';

interface MoreMenuProps {
  post: PostItemFragment;
}

function MoreMenu({ post }: MoreMenuProps): JSX.Element {
  const items = useMenuItems();

  return (
    <DotsMenu>
      {items.map((item) => (
        <Menu.Item key={item.text}>
          {({ active }) => (
            <button
              className={clsx('flex items-center rounded px-2 py-1 transition-all duration-200', {
                'bg-midnight text-white dark:bg-neutral-600': active,
                'text-midnight dark:text-white': !active,
              })}
              onClick={() => {
                item.action(post);
              }}
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
