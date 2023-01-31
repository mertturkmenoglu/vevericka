import { Menu } from '@headlessui/react';
import { LazyImage } from '../LazyImage';

function MenuButton(): JSX.Element {
  return (
    <Menu.Button className="min-h-5 min-w-5 m-0 mt-1 flex h-5 w-5 items-center justify-center">
      <LazyImage
        src="https://fastly.picsum.photos/id/212/200/200.jpg?hmac=U4JUx4PJyTuKdZEPAk2Cw01YZM8rOypF8fTTO39POko"
        alt="User image"
        placeholderSrc="/user.jpg"
        placeholderAlt="Loading"
        className="min-h-5 min-w-5 h-5 w-5 rounded-full"
      />
    </Menu.Button>
  );
}

export default MenuButton;
