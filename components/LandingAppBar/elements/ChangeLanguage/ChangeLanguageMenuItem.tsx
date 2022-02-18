import { Menu } from '@headlessui/react';
import { IAvailableLanguage } from '../../../../utils/AvailableLanguages';

export interface ChangeLanguageMenuItemProps {
  language: IAvailableLanguage;
  onClick: (language: IAvailableLanguage) => void;
}

const ChangeLanguageMenuItem: React.FC<ChangeLanguageMenuItemProps> = ({ language, onClick }) => {
  return (
    <Menu.Item>
      {() => (
        <button
          className={'text-midnight dark:text-white group flex rounded-md items-center w-full px-2 py-2 text-sm'}
          onClick={(event) => {
            event.preventDefault();
            onClick(language);
          }}
        >
          {language.name}
        </button>
      )}
    </Menu.Item>
  );
};

export default ChangeLanguageMenuItem;
