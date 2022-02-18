import { Menu } from '@headlessui/react';
import { GlobeIcon } from '@heroicons/react/outline';

export interface ChangeLanguageMenuButton {
  altText: string;
}

const ChangeLanguageMenuButton: React.FC<ChangeLanguageMenuButton> = ({ altText }) => {
  return (
    <Menu.Button className='flex items-center'>
      <GlobeIcon
        className='w-12 h-12 sm:w-8 sm:h-8 text-midnight dark:text-white'
        aria-hidden='true'
      />
      <span className='sr-only'>{altText}</span>
    </Menu.Button>
  );
};

export default ChangeLanguageMenuButton;