import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { AppBar } from '../../components';
import { useFlags } from '../../hooks';

export interface MainLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  mainClassName?: string;
  appBarClassName?: string;
}

function MainLayout({ mainClassName, appBarClassName, className, children, ...props }: MainLayoutProps): JSX.Element {
  const flags = useFlags();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY >= 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className={clsx('mx-auto', !flags.appBarV2 && 'container', mainClassName)}>
      <AppBar
        className={clsx(
          'container fixed left-0 right-0 top-0 z-20 mx-auto px-8 py-2',
          'transition duration-300 ease-in-out',
          {
            'bg-white': !isScrolled,
            'rounded-b bg-neutral-100': isScrolled,
          },
          appBarClassName
        )}
      />
      <div
        className={clsx('mx-auto mt-24 flex max-w-5xl items-start justify-between', className)}
        {...props}
      >
        {children}
      </div>
    </main>
  );
}

export default MainLayout;
