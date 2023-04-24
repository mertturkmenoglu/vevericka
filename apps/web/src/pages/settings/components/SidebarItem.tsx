import { Tab } from '@headlessui/react';
import clsx from 'clsx';

interface Props {
  name: string;
  icon: TwIcon;
}

function SidebarItem({ name, icon: Icon }: Props): JSX.Element {
  return (
    <Tab
      className={({ selected }) =>
        clsx('flex w-full rounded px-4 py-2.5 text-sm font-medium leading-5 transition-all focus:outline-none', {
          'bg-midnight text-white dark:bg-neutral-800': selected,
          'text-midnight hover:bg-midnight/70 hover:text-white dark:text-white dark:hover:bg-neutral-800': !selected,
        })
      }
    >
      <Icon className="h-5 w-5" />
      <span className="ml-2">{name}</span>
    </Tab>
  );
}

export default SidebarItem;
