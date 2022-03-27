import {
  AtSymbolIcon,
  BookmarkIcon,
  BookOpenIcon,
  CloudIcon,
  CogIcon,
  FlagIcon,
  HashtagIcon,
  LockClosedIcon,
  LogoutIcon,
  QuestionMarkCircleIcon,
  SunIcon,
  TranslateIcon,
} from '@heroicons/react/outline';
import { signOut } from 'next-auth/react';
import MenuProfile from './MenuProfile';
import LinkItem from './LinkItem';
import ThemeSwitch from './ThemeSwitch';
import ButtonItem from './ButtonItem';
import Copyright from './Copyright';
import { useTranslation } from 'next-i18next';
import constants from '../../AppBar.constants';
import { addResourceBundles } from '../../../../utils/addResourceBundles';
import translations from '../../AppBar.i18n';

export interface MenuItemsProps {
  username: string;
  userImage: string;
  toggleLanguageDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const MenuItems: React.FC<MenuItemsProps> = ({ userImage, username, toggleLanguageDialog }) => {
  const { t, i18n } = useTranslation(constants.I18N_NS);
  addResourceBundles(i18n, constants.I18N_NS, translations);

  return (
    <>
      <div className="px-2 py-1">
        <MenuProfile username={username} userImage={userImage} />
      </div>

      <div className="px-2 py-1">
        <LinkItem href="/explore" text={t('menu.explore')} icon={HashtagIcon} />

        <LinkItem href="/bookmarks" text={t('menu.bookmarks')} icon={BookmarkIcon} />

        <LinkItem href="/settings" text={t('menu.settings')} icon={CogIcon} />

        <ThemeSwitch text={t('menu.darkMode')} icon={SunIcon} />

        <ButtonItem text={t('menu.logout')} onClick={async () => await signOut()} icon={LogoutIcon} />

        <ButtonItem text={t('menu.displayLanguage')} onClick={() => toggleLanguageDialog(true)} icon={TranslateIcon} />
      </div>

      <div className="px-2 py-1">
        <LinkItem href="/help" text={t('menu.help')} icon={QuestionMarkCircleIcon} />

        <LinkItem href="/contact" text={t('menu.contact')} icon={AtSymbolIcon} />

        <LinkItem href="/report" text={t('menu.report')} icon={FlagIcon} />

        <LinkItem href="/terms" text={t('menu.terms')} icon={BookOpenIcon} />

        <LinkItem href="/privacy" text={t('menu.privacy')} icon={LockClosedIcon} />
      </div>

      <div className="px-2 py-1">
        <LinkItem href="/status" text={t('menu.status')} icon={CloudIcon} />
      </div>

      <Copyright />
    </>
  );
};

export default MenuItems;
