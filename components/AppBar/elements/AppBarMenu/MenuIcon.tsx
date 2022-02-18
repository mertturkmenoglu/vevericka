import { Menu } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/outline';

export interface MenuIconProps {
  altText: string;
  ariaHidden: boolean;
}

const MenuIcon: React.FC<MenuIconProps> = ({ altText, ariaHidden }) => {
  return (
    <div>
      <Menu.Button className="m-0 flex items-center justify-center">
        <span className="sr-only">{altText}</span>
        <ChevronDownIcon className="app-bar-icon" aria-hidden={ariaHidden} />
      </Menu.Button>
    </div>
  );
};

export default MenuIcon;
