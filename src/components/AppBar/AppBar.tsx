import React from 'react';
import clsx from 'clsx';
import { AppLogo } from '@atom/index';
import { IconGroup } from './IconGroup';
import { Menu } from './Menu';
import Link from 'next/link';

export interface AppBarProps {
  app?: boolean;
  className?: string;
}

function AppBar({ app = false, className }: AppBarProps): JSX.Element {
  return (
    <nav
      className={clsx(
        {
          'container mx-auto max-w-5xl': !app,
          'w-full': app,
        },
        'rounded-none lg:rounded-full',
        'flex justify-between rounded-full bg-paper-50 px-8 py-2 dark:bg-midnight',
        className
      )}
    >
      <Link href="/feed">
        <a className="flex items-center">
          <div className="sm:hidden">
            <AppLogo variant="icon" />
          </div>
          <div className="hidden sm:flex">
            <AppLogo variant="lockup" />
          </div>
        </a>
      </Link>

      <div className="flex items-center justify-end">
        <IconGroup />
        <Menu />
      </div>
    </nav>
  );
}

export default AppBar;
