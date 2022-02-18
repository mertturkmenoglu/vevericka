import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { IAvailableLanguage } from '../../../../utils/AvailableLanguages';
import ChangeLanguageMenuItem from './ChangeLanguageMenuItem';

export interface ChangeLanguageMenuProps {
  languages: IAvailableLanguage[];
  onItemClick: (language: IAvailableLanguage) => void;
}

const ChangeLanguageMenu: React.FC<ChangeLanguageMenuProps> = ({ languages, onItemClick }) => {
  return (
    <Transition
      as={Fragment}
      enter='transition ease-out duration-100'
      enterFrom='transform opacity-0 scale-95'
      enterTo='transform opacity-100 scale-100'
      leave='transition ease-in duration-75'
      leaveFrom='transform opacity-100 scale-100'
      leaveTo='transform opacity-0 scale-95'
    >
      <Menu.Items
        className={
          `absolute -left-16 sm:right-0 w-56 mt-2 top-16 sm:top-14 origin-top-right bg-white 
          dark:bg-neutral-800 dark:text-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black 
          ring-opacity-5 focus:outline-none`
        }
      >
        <div className='px-1 py-1 '>
          {languages.map((language) => (
            <ChangeLanguageMenuItem
              language={language}
              onClick={onItemClick}
              key={language.key}
            />
          ))}
        </div>
      </Menu.Items>
    </Transition>
  );
};

export default ChangeLanguageMenu;
