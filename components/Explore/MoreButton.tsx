import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { useTranslation } from 'next-i18next';

import { addResourceBundles } from '@utils/index';
import constants from './Explore.constants';
import { translations } from './Explore.i18n';

export interface MoreButtonProps {}

const MoreButton: React.FC<MoreButtonProps> = () => {
  const { t, i18n } = useTranslation(constants.I18N_NS);
  addResourceBundles(i18n, constants.I18N_NS, translations);

  return (
    <Link href="/explore">
      <a className="flex justify-end outline-none" tabIndex={-1}>
        <span
          className={clsx(
            'rounded-full',
            'bg-midnight text-white outline-primary ',
            'py-1 px-4',
            'text-sm',
            'duration-100 ease-in-out hover:scale-[1.01]',
          )}
          tabIndex={0}
        >
          {t('more')}
        </span>
      </a>
    </Link>
  );
};

export default MoreButton;
