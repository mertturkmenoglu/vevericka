import { Menu } from '@headlessui/react';
import { LazyImage } from '../LazyImage';

export interface MenuButtonProps {
  src: string;
}

function MenuButton({ src }: MenuButtonProps): JSX.Element {
  return (
    <Menu.Button className="min-h-10 min-w-10 m-0 mt-1 flex h-10 w-10 items-center justify-center">
      <LazyImage
        src={src}
        alt="User image"
        placeholderSrc="/user.jpg"
        placeholderAlt="Loading"
        className="min-h-10 min-w-10 h-10 w-10 rounded-full"
      />
    </Menu.Button>
  );
}

export default MenuButton;
