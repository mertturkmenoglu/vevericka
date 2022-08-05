import React, { useMemo } from 'react';
import clsx from 'clsx';
import LinkItem from './LinkItem';
import useTranslation from 'next-translate/useTranslation';
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
  TranslateIcon,
} from '@heroicons/react/outline';
import { signOut } from 'next-auth/react';
import MenuProfile from './MenuProfile';
import ThemeSwitch from './ThemeSwitch';
import ButtonItem from './ButtonItem';

export interface MenuItemsProps {
  username: string;
  userImage: string;
  toggleLanguageDialog: React.Dispatch<React.SetStateAction<boolean>>;
  className?: string;
}

function MenuItems({ username, userImage, toggleLanguageDialog, className }: MenuItemsProps): JSX.Element {
  const { t } = useTranslation('common');
  const year = useMemo(() => {
    return new Date().getFullYear();
  }, []);

  return (
    <div className={clsx(className)}>
      <div className="px-2 py-1">
        <MenuProfile
          username={username}
          userImage={userImage}
        />
      </div>

      <div className="px-2 py-1">
        <LinkItem
          href="/explore"
          text={t('appBar.menu.explore')}
          icon={HashtagIcon}
        />

        <LinkItem
          href="/bookmarks"
          text={t('appBar.menu.bookmarks')}
          icon={BookmarkIcon}
        />

        <LinkItem
          href="/settings"
          text={t('appBar.menu.settings')}
          icon={CogIcon}
        />

        <ThemeSwitch />

        <ButtonItem
          text={t('appBar.menu.logout')}
          onClick={async () => {
            await signOut();
          }}
          icon={LogoutIcon}
        />

        <ButtonItem
          text={t('appBar.menu.displayLanguage')}
          onClick={() => toggleLanguageDialog(true)}
          icon={TranslateIcon}
        />
      </div>

      <div className="px-2 py-1">
        <LinkItem
          href="/help"
          text={t('appBar.menu.help')}
          icon={QuestionMarkCircleIcon}
        />

        <LinkItem
          href="/contact"
          text={t('appBar.menu.contact')}
          icon={AtSymbolIcon}
        />

        <LinkItem
          href="/report"
          text={t('appBar.menu.report')}
          icon={FlagIcon}
        />

        <LinkItem
          href="/terms"
          text={t('appBar.menu.terms')}
          icon={BookOpenIcon}
        />

        <LinkItem
          href="/privacy"
          text={t('appBar.menu.privacy')}
          icon={LockClosedIcon}
        />
      </div>

      <div className="px-2 py-1">
        <LinkItem
          href="https://vevericka.statuspage.io/"
          text={t('appBar.menu.status')}
          icon={CloudIcon}
        />
      </div>

      <div className="flex items-center space-x-1 px-4 py-1 text-sm">
        <span className="text-midnight dark:text-gray-200">Vevericka</span>
        <span className="text-primary">&copy;</span>
        <span className="text-midnight dark:text-gray-200">{year}</span>
      </div>
    </div>
  );
}

export default MenuItems;
