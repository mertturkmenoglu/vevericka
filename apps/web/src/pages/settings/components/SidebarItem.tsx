import { Tab } from '@headlessui/react';
import clsx from 'clsx';

type THeroIcon = (
  props: React.SVGProps<SVGSVGElement> & {
    title?: string | undefined;
    titleId?: string | undefined;
  }
) => JSX.Element;

interface Props {
  name: string;
  icon: THeroIcon;
}

function SidebarItem({ name, icon: Icon }: Props): JSX.Element {
  return (
    <Tab
      className={({ selected }) =>
        clsx(
          'flex w-full rounded py-2.5 px-4 text-sm font-medium leading-5 text-midnight transition-all focus:outline-none',
          {
            'bg-midnight text-white': selected,
            'hover:bg-midnight/70 hover:text-white': !selected,
          }
        )
      }
    >
      <Icon className="h-5 w-5" />
      <span className="ml-2">{name}</span>
    </Tab>
  );
}

export default SidebarItem;
