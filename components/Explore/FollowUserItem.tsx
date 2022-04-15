import React, { useCallback } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { useTranslation } from 'next-i18next';

import { MinimalUserResponse } from '@service/common/models';
import { addResourceBundles } from '@utils/index';
import constants from './Explore.constants';
import { translations } from './Explore.i18n';

export interface FollowUserItemProps {
  user: MinimalUserResponse;
}

const FollowUserItem: React.FC<FollowUserItemProps> = ({ user }) => {
  const { t, i18n } = useTranslation(constants.I18N_NS);
  addResourceBundles(i18n, constants.I18N_NS, translations);

  const image = useCallback((s: string) => (s === 'profile.png' ? '/assets/profile.png' : s), []);

  return (
    <div
      className={clsx(
        'flex items-center justify-between',
        'px-2 py-1',
        'rounded-md',
        'transition duration-200 ease-in-out',
        'bg-transparent hover:bg-paper-100 dark:hover:bg-paper-400',
      )}
    >
      <Link href={`/user/${user.username}`}>
        <a
          className={clsx(
            'flex items-center justify-start',
            'w-full',
            'outline-primary',
            'text-midnight dark:text-gray-400',
          )}
        >
          <img src={image(user.image)} alt="" className="h-10 w-10 rounded-full" />
          <div className="ml-2 flex flex-col text-base">
            <span className="w-48 truncate text-base font-bold">{user.name}</span>
            <div>
              <span className="text-base font-bold text-primary">@</span>
              <span className="ml-1 hover:underline focus:underline">{user.username}</span>
            </div>
          </div>
        </a>
      </Link>
      <button
        className={clsx(
          'flex items-center justify-center',
          'rounded-full py-1 px-4',
          'text-clip whitespace-nowrap',
          'bg-midnight outline-primary',
          'text-sm text-white',
          'duration-100 ease-in-out hover:scale-[1.01]',
        )}
      >
        {t('follow')}
      </button>
    </div>
  );
};

export default FollowUserItem;
