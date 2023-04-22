import clsx from 'clsx';
import React from 'react';
import { AppBar } from '../../components';
import { useFlags } from '../../hooks';

export interface MainLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  mainClassName?: string;
  appBarClassName?: string;
}

function MainLayout({ mainClassName, appBarClassName, className, children, ...props }: MainLayoutProps): JSX.Element {
  const flags = useFlags();

  return (
    <main className={clsx('mx-auto', !flags.appBarV2 && 'container', mainClassName)}>
      <AppBar className={clsx('px-8 py-2', appBarClassName)} />
      <div
        className={clsx('mx-auto mt-8 flex max-w-5xl items-start justify-between', className)}
        {...props}
      >
        {children}
      </div>
    </main>
  );
}

export default MainLayout;
