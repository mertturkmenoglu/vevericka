import { Menu } from '@headlessui/react';
import { IAvailableLanguage } from '@utils/index';
import ChangeLanguageMenuButton from './ChangeLanguageMenuButton';
import ChangeLanguageMenu from './ChangeLanguageMenu';

export interface ChangeLanguageProps {
  altText: string;
  languages: IAvailableLanguage[];
  onItemClick: (language: IAvailableLanguage) => void;
}

const ChangeLanguage: React.FC<ChangeLanguageProps> = ({ altText, languages, onItemClick }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <ChangeLanguageMenuButton altText={altText} />
      </div>
      <ChangeLanguageMenu languages={languages} onItemClick={onItemClick} />
    </Menu>
  );
};

export default ChangeLanguage;
