import { Menu } from '@headlessui/react';
import { LazyImage } from '../LazyImage';

function MenuButton(): JSX.Element {
  return (
    <Menu.Button className="min-h-10 min-w-10 m-0 mt-1 flex h-10 w-10 items-center justify-center">
      <LazyImage
        src="https://i.picsum.photos/id/823/200/200.jpg?hmac=zD0Ti1kYqMOUsfNVS7xtDou-2ECcI0RXYs18C54EdYo"
        alt="User image"
        placeholderSrc="/user.jpg"
        placeholderAlt="Loading"
        className="min-h-10 min-w-10 h-10 w-10 rounded-full border-2 border-berry"
      />
    </Menu.Button>
  );
}

export default MenuButton;
