import { useContext, useEffect } from 'react';
import { BellIcon, MailIcon, SearchIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { ApplicationContext } from '../context/ApplicationContext';
import { LocalStorage } from '../utils/LocalStorage';
import { useTheme } from 'next-themes';
import AppBarMenu from './AppBarMenu';
import { useForceUpdate } from '../hooks/useForceUpdate';

export interface AppBarProps {}

const AppBar: React.FC<AppBarProps> = ({}) => {
  const appContext = useContext(ApplicationContext);
  const { setTheme } = useTheme();
  const forceUpdate = useForceUpdate();

  const visibleIcons = [
    {
      Icon: SearchIcon,
      href: '/search',
      isMobileOnly: true,
    },
    {
      Icon: BellIcon,
      href: '/notifications',
      isMobileOnly: false,
    },
    {
      Icon: MailIcon,
      href: '/messages',
      isMobileOnly: false,
    },
  ];

  useEffect(() => {
    const storage = new LocalStorage();
    appContext.setIsDarkTheme(storage.isDarkTheme);
    setTheme(storage.isDarkTheme ? 'dark' : 'light');
    forceUpdate();
  }, []);

  return (
    <nav className="w-full flex justify-between px-4 dark:bg-neutral-800">
      <Link href="/">
        <a className="flex items-center">
          <Image src="/assets/icon_primary.svg" width={32} height={32} />
          <div className="text-xl text-deep-orange ml-4 mt-1 hidden sm:block">
            Vevericka
          </div>
        </a>
      </Link>
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search"
          className="hidden sm:block bg-gray-100 dark:bg-neutral-700 dark:placeholder:text-gray-200 px-4 py-1 rounded-full placeholder:text-gray-400 focus:outline-none text-gray-400 dark:text-gray-200"
        />

        {visibleIcons.map(({ Icon, href, isMobileOnly }) => (
          <Link href={href} key={href}>
            <a>
              <Icon
                className={clsx('app-bar-icon', { 'sm:hidden': isMobileOnly })}
              />
            </a>
          </Link>
        ))}

        <AppBarMenu />
      </div>
    </nav>
  );
};

export default AppBar;
