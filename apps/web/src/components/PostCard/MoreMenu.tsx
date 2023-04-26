import { Menu } from '@headlessui/react';
import clsx from 'clsx';
import { useState } from 'react';
import { PostItemFragment } from '../../generated/graphql';
import { Dialog } from '../Dialog';
import { DotsMenu } from '../DotsMenu';
import { useMenuItems } from './useMenuItems';

interface MoreMenuProps {
  post: PostItemFragment;
}

function MoreMenu({ post }: MoreMenuProps): JSX.Element {
  const items = useMenuItems(post);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const deleteItem = items.find((item) => item.key === 'delete');

  return (
    <>
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
                  if (item.key === 'delete') {
                    setIsDeleteOpen(true);
                    return;
                  }
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

      {deleteItem && (
        <Dialog
          isOpen={isDeleteOpen}
          setIsOpen={setIsDeleteOpen}
        >
          <div className="w-full">
            <div className="p-4">
              <p className="text-lg font-semibold">Are you sure?</p>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">This action cannot be undone.</p>
            </div>

            <div className="flex items-center justify-end space-x-4 p-4">
              <button
                className={clsx(
                  'rounded bg-neutral-200 px-2 py-1 text-neutral-800 transition duration-200 ease-in-out'
                )}
                onClick={() => {
                  setIsDeleteOpen(false);
                }}
              >
                Cancel
              </button>
              <button
                className={clsx(
                  'rounded bg-red-600 px-4 py-1 text-white transition duration-200 ease-in-out hover:bg-red-500'
                )}
                onClick={() => {
                  deleteItem.action(post);
                  setIsDeleteOpen(false);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </Dialog>
      )}
    </>
  );
}

export default MoreMenu;
