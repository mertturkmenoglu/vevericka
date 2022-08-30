import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { SunIcon } from '@heroicons/react/24/outline';
import { Tooltip, AppLogo } from '@atom/index';
import { useTheme } from 'next-themes';
import useTranslation from 'next-translate/useTranslation';
import ChangeLanguage from './ChangeLanguage';

export interface LandingAppBarProps {
  className?: string;
}

function LandingAppBar({ className }: LandingAppBarProps): JSX.Element {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation('landing');

  return (
    <nav
      className={clsx(
        'flex items-center justify-between rounded-full bg-paper-50 px-8 py-4 dark:bg-neutral-800',
        className
      )}
    >
      <Link href="/">
        <a>
          <AppLogo variant="lockup" />
        </a>
      </Link>

      <div className={clsx('flex items-center space-x-4')}>
        <Tooltip
          text={t('appBar.changeTheme')}
          position="top"
        >
          <button
            onClick={() => {
              setTheme(theme === 'dark' ? 'light' : 'dark');
            }}
            className="flex items-center"
          >
            <span className="sr-only">{t('appBar.changeTheme')}</span>
            <SunIcon className="h-8 w-8 text-primary dark:text-white" />
          </button>
        </Tooltip>

        <Tooltip
          text={t('appBar.changeLanguage')}
          position="top"
        >
          <ChangeLanguage />
        </Tooltip>

        <Link href="/login">
          <a className={clsx('rounded-full bg-midnight py-2 px-4 font-semibold text-white dark:bg-primary')}>
            {t('appBar.login')}
          </a>
        </Link>
      </div>
    </nav>
  );
}

export default LandingAppBar;
