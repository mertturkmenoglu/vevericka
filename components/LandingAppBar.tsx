import Link from 'next/link';
import Image from 'next/image';
import { Menu, Transition } from '@headlessui/react';
import { GlobeIcon, SunIcon } from '@heroicons/react/outline';
import { Fragment, useContext } from 'react';
import Cookies from 'universal-cookie';
import { useTranslation } from 'next-i18next';
import { ApplicationContext } from '../context/ApplicationContext';
import { LocalStorage } from '../utils/LocalStorage';
import { useTheme } from 'next-themes';

export interface LandingAppBarProps {}

const LandingAppBar: React.FC<LandingAppBarProps> = ({}) => {
  const languages = [
    { key: 'en', display: 'English' },
    { key: 'es', display: 'Spanish' },
    { key: 'tr', display: 'Turkish' },
  ];

  const { t } = useTranslation('landing');
  const appContext = useContext(ApplicationContext);
  const { setTheme } = useTheme();

  return (
    <nav className="flex justify-between items-center bg-white dark:bg-neutral-800">
      <Link href="/">
        <a className="flex items-center">
          <Image
            src="/assets/icon_primary.svg"
            width={32}
            height={32}
            alt="Application icon"
          />
        </a>
      </Link>

      <div className="flex items-center">
        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="flex items-center">
              <GlobeIcon
                className="w-8 h-8 text-midnight dark:text-white"
                aria-hidden="true"
              />
              <span className="sr-only">{t('langDescription')}</span>
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1 ">
                {languages.map((lng) => (
                  <Menu.Item key={lng.key}>
                    {({ active }) => (
                      <button
                        className={`${
                          active ? 'bg-midnight text-white' : 'text-midnight'
                        } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                        onClick={() => {
                          const cookies = new Cookies();
                          cookies.set('NEXT_LOCALE', lng.key);
                          window.location.href = '/';
                        }}
                      >
                        {lng.display}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>

        <button
          onClick={() => {
            const value = appContext.isDarkTheme;
            appContext.setIsDarkTheme((prev) => !prev);
            const storage = new LocalStorage();
            storage.isDarkTheme = !value;
            setTheme(!value ? 'dark' : 'light');
          }}
        >
          <span className="sr-only">
            {appContext.isDarkTheme
              ? t('themeIconAlt.dark')
              : t('themeIconAlt.light')}
          </span>
          <SunIcon className="w-8 h-8 text-primary dark:text-white ml-4" />
        </button>

        <Link href="/login">
          <a className="font-medium text-gray-800 hover:bg-gray-100 dark:text-white dark:hover:bg-neutral-700 py-2.5 px-3 rounded-full ml-4">
            {t('login')}
          </a>
        </Link>

        <Link href="/register">
          <a className="font-medium bg-midnight dark:bg-primary ml-4 py-2.5 px-3 rounded-full text-white">
            {t('register')}
          </a>
        </Link>
      </div>
    </nav>
  );
};

export default LandingAppBar;
