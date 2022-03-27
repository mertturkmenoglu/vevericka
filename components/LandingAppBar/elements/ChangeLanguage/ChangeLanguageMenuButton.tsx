import { Menu } from '@headlessui/react';
import { GlobeIcon } from '@heroicons/react/outline';

export interface ChangeLanguageMenuButton {
  altText: string;
}

const ChangeLanguageMenuButton: React.FC<ChangeLanguageMenuButton> = ({ altText }) => {
  return (
    <Menu.Button className="flex items-center" data-testid="change-language-button">
      <GlobeIcon className="h-12 w-12 text-midnight dark:text-white sm:h-8 sm:w-8" aria-hidden="true" />
      <span className="sr-only">{altText}</span>
    </Menu.Button>
  );
};

export default ChangeLanguageMenuButton;
