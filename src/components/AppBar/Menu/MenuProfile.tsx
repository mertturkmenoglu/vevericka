import { Avatar } from '@atom/index';
import { Menu } from '@headlessui/react';
import useTranslation from 'next-translate/useTranslation';
import Link from 'next/link';
import React from 'react';
import { useAtom } from 'jotai';
import { userAtom } from '@context/jotai';
import { useUserImage } from '@hooks/useUserImage';

function MenuProfile(): JSX.Element {
  const [user] = useAtom(userAtom);
  const userImage = useUserImage(user.image);
  const { t, lang } = useTranslation('common');

  return (
    <Menu.Item>
      {() => (
        <Link
          href={`/user/${user.username}`}
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
              <span className="text-sm font-medium text-primary">@{user.username}</span>
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
