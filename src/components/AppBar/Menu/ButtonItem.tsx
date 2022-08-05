import { Menu } from '@headlessui/react';

export interface ButtonItemProps {
  text: string;
  onClick: () => void | Promise<void>;
  icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element;
}

function ButtonItem({ text, onClick, icon: Icon }: ButtonItemProps): JSX.Element {
  return (
    <Menu.Item>
      {() => (
        <button
          className="my-1 flex w-full items-center rounded-full px-2 py-1 hover:bg-primary hover:bg-opacity-10 dark:hover:bg-opacity-25"
          onClick={onClick}
        >
          <Icon className="h-6 w-6 text-primary" />
          <span className="ml-2 text-sm font-medium text-midnight dark:text-gray-200">{text}</span>
        </button>
      )}
    </Menu.Item>
  );
}

export default ButtonItem;
