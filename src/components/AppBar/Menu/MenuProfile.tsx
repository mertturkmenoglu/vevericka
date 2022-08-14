import { Avatar } from '@atom/index';
import { Menu } from '@headlessui/react';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import React from 'react';

export interface MenuProfileProps {
  username: string;
  userImage: string;
}

function MenuProfile({ username, userImage }: MenuProfileProps): JSX.Element {
  const { t, lang } = useTranslation('common');

  return (
    <Menu.Item>
      {() => (
        <Link
          href={`/user/${username}`}
          locale={lang}
        >
          <a className="flex">
            <Avatar
              appearance="circle"
              label={t('appBar.menu.profile.imageAlt')}
              size="default"
              src={userImage}
              className="m-2"
            />
            <div className="mt-2 flex flex-col">
              <span className="text-sm font-medium text-primary">@{username}</span>
              <span className="text-xs font-light text-neutral-500 dark:text-neutral-400">
                {t('appBar.menu.profile.viewYourProfile')}
              </span>
            </div>
          </a>
        </Link>
      )}
    </Menu.Item>
  );
}

export default MenuProfile;
