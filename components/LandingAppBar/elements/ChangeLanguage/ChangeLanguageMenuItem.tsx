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
          className={'group flex w-full items-center rounded-md px-2 py-2 text-sm text-midnight dark:text-white'}
          onClick={(event) => {
            event.preventDefault();
            onClick(language);
          }}
          data-testid={`language-button-${language.key}`}
        >
          {language.name}
        </button>
      )}
    </Menu.Item>
  );
};

export default ChangeLanguageMenuItem;
