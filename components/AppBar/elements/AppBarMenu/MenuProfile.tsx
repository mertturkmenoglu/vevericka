import React from 'react';
import { Menu } from '@headlessui/react';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import constants from '../../AppBar.constants';
import { addResourceBundles } from '../../../../utils/addResourceBundles';
import translations from '../../AppBar.i18n';

export interface MenuProfileProps {
  username: string;
  userImage: string;
}

const MenuProfile: React.FC<MenuProfileProps> = ({ username, userImage }) => {
  const { t, i18n } = useTranslation(constants.I18N_NS);
  addResourceBundles(i18n, constants.I18N_NS, translations);

  return (
    <Menu.Item>
      {() => (
        <Link href={`/user/${username}`}>
          <a className="flex">
            <img
              src={userImage}
              className="m-2 h-10 w-10 rounded-full"
              alt={t('menu.profile.imageAlt')}
            />
            <div className="mt-2 flex flex-col">
              <span className="text-sm font-medium text-primary">
                @{username}
              </span>
              <span className="text-xs font-light text-neutral-500 dark:text-neutral-400">
                {t('menu.profile.viewYourProfile')}
              </span>
            </div>
          </a>
        </Link>
      )}
    </Menu.Item>
  );
};

export default MenuProfile;