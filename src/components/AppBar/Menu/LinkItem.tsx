import Link from 'next/link';
import { Menu } from '@headlessui/react';

export interface LinkItemProps {
  href: string;
  text: string;
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
}

function LinkItem({ href, text, icon: Icon }: LinkItemProps): JSX.Element {
  return (
    <Menu.Item>
      {() => (
        <Link href={href}>
          <a className="my-1 flex items-center rounded-full px-2 py-1 hover:bg-primary hover:bg-opacity-10 dark:hover:bg-opacity-25">
            <Icon className="h-6 w-6 text-primary" />
            <span className="ml-2 text-sm font-medium text-midnight dark:text-gray-200">{text}</span>
          </a>
        </Link>
      )}
    </Menu.Item>
  );
}

export default LinkItem;
