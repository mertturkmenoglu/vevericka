import React from 'react';
import clsx from 'clsx';
import { AppLogo } from '@atom/index';
import { IconGroup } from './IconGroup';
import { Menu } from './Menu';
import Link from 'next/link';

export type AppBarWidth = 'full' | 'large' | 'medium';

export interface AppBarProps {
  width?: AppBarWidth;
  className?: string;
}

function AppBar({ width = 'large', className }: AppBarProps): JSX.Element {
  return (
    <nav
      className={clsx(
        {
          'w-full': width === 'full',
          'max-w-7xl': width === 'large',
          'max-w-5xl': width === 'medium',
          'container mx-auto': width !== 'full',
        },
        'rounded-none',
        {
          'lg:rounded-full': width !== 'full',
        },
        'flex justify-between bg-paper-50 px-8 py-2 dark:bg-midnight',
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
