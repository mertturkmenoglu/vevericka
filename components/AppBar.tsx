import { Fragment, useContext, useEffect, useMemo } from 'react';
import { Menu, Switch, Transition } from '@headlessui/react';
import {
  AtSymbolIcon,
  BellIcon,
  BookmarkIcon,
  BookOpenIcon,
  ChevronDownIcon,
  CloudIcon,
  CogIcon,
  FlagIcon,
  HashtagIcon,
  LockClosedIcon,
  LogoutIcon,
  MailIcon,
  QuestionMarkCircleIcon,
  SearchIcon,
  SunIcon,
} from '@heroicons/react/outline';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { signOut } from 'next-auth/react';
import { ApplicationContext } from '../context/ApplicationContext';
import { LocalStorage } from '../utils/LocalStorage';
import { useForceUpdate } from '../hooks/useForceUpdate';

export interface AppBarProps {}

const AppBar: React.FC<AppBarProps> = ({}) => {
  const appContext = useContext(ApplicationContext);
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    const storage = new LocalStorage();
    appContext.isDarkTheme = storage.isDarkTheme;
  }, []);

  const image = useMemo(() => {
    if (appContext.user.image === 'profile.png') {
      return '/assets/profile.png';
    }

    return appContext.user.image;
  }, [appContext]);

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

        <Link href="/search">
          <a>
            <SearchIcon className="app-bar-icon sm:hidden" />
          </a>
        </Link>

        <Link href="/notifications">
          <a>
            <BellIcon className="app-bar-icon" />
          </a>
        </Link>

        <Link href="/messages">
          <a className="">
            <MailIcon className="app-bar-icon" />
          </a>
        </Link>

        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="flex items-center justify-center m-0">
              <span className="sr-only">Menu</span>
              <ChevronDownIcon className="app-bar-icon" aria-hidden="true" />
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
            <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white dark:bg-neutral-700 divide-y divide-gray-100 rounded-md shadow-sm ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1">
                <Menu.Item>
                  {() => (
                    <Link href={`/user/${appContext.user.username}`}>
                      <a className="flex">
                        <img
                          src={image}
                          className="rounded-full w-10 h-10 m-2"
                          alt="User image"
                        />
                        <div className="flex flex-col mt-2">
                          <span className="text-deep-orange font-medium text-sm">
                            @{appContext.user.username}
                          </span>
                          <span className="text-gray-500 text-xs font-light dark:text-gray-400">
                            View your profile
                          </span>
                        </div>
                      </a>
                    </Link>
                  )}
                </Menu.Item>
              </div>

              <div className="px-2 py-1">
                <Menu.Item>
                  {() => (
                    <Link href="/explore">
                      <a className="flex items-center hover:bg-orange-100 px-2 py-1 my-1 rounded-full dark:hover:bg-opacity-25">
                        <HashtagIcon className="w-6 h-6 text-deep-orange" />
                        <span className="ml-2 font-medium text-sm text-gray-700 dark:text-gray-200">
                          Explore
                        </span>
                      </a>
                    </Link>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {() => (
                    <Link href="/bookmarks">
                      <a className="flex items-center hover:bg-orange-100 px-2 py-1 my-1 rounded-full dark:hover:bg-opacity-25">
                        <BookmarkIcon className="w-6 h-6 text-deep-orange" />
                        <span className="ml-2 font-medium text-sm text-gray-700 dark:text-gray-200">
                          Bookmarks
                        </span>
                      </a>
                    </Link>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {() => (
                    <Link href="/settings">
                      <a className="flex items-center hover:bg-orange-100 px-2 py-1 my-1 rounded-full dark:hover:bg-opacity-25">
                        <CogIcon className="w-6 h-6 text-deep-orange" />
                        <span className="ml-2 font-medium text-sm text-gray-700 dark:text-gray-200">
                          Settings
                        </span>
                      </a>
                    </Link>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {() => (
                    <Link href="/explore">
                      <a className="flex items-center justify-between hover:bg-orange-100 px-2 py-1 my-1 rounded-full dark:hover:bg-opacity-25">
                        <div className="flex items-center">
                          <SunIcon className="w-6 h-6 text-deep-orange" />
                          <span className="ml-2 font-medium text-sm text-gray-700 dark:text-gray-200">
                            Dark Theme
                          </span>
                        </div>
                        <Switch
                          checked={appContext.isDarkTheme}
                          onChange={(value) => {
                            appContext.isDarkTheme = value;
                            const storage = new LocalStorage();
                            storage.isDarkTheme = value;
                            forceUpdate();
                          }}
                          className={clsx(
                            'relative inline-flex flex-shrink-0 h-5 w-10 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200',
                            {
                              'bg-deep-orange': appContext.isDarkTheme,
                              'bg-orange-200': !appContext.isDarkTheme,
                            }
                          )}
                        >
                          <span className="sr-only">Dark Theme</span>
                          <span
                            aria-hidden="true"
                            className={`${
                              appContext.isDarkTheme
                                ? 'translate-x-5'
                                : 'translate-x-1'
                            }
            pointer-events-none inline-block h-3 w-3 rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200 mt-0.5`}
                          />
                        </Switch>
                      </a>
                    </Link>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {() => (
                    <button
                      className="w-full flex items-center hover:bg-orange-100 px-2 py-1 my-1 rounded-full dark:hover:bg-opacity-25"
                      onClick={async () => await signOut()}
                    >
                      <LogoutIcon className="w-6 h-6 text-deep-orange" />
                      <span className="ml-2 font-medium text-sm text-gray-700 dark:text-gray-200">
                        Logout
                      </span>
                    </button>
                  )}
                </Menu.Item>
              </div>

              <div className="px-2 py-1">
                <Menu.Item>
                  {() => (
                    <Link href="/help">
                      <a className="flex items-center hover:bg-orange-100 px-2 py-1 my-1 rounded-full dark:hover:bg-opacity-25">
                        <QuestionMarkCircleIcon className="w-6 h-6 text-deep-orange" />
                        <span className="ml-2 font-medium text-sm text-gray-700 dark:text-gray-200">
                          Help
                        </span>
                      </a>
                    </Link>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {() => (
                    <Link href="/contact">
                      <a className="flex items-center hover:bg-orange-100 px-2 py-1 my-1 rounded-full dark:hover:bg-opacity-25">
                        <AtSymbolIcon className="w-6 h-6 text-deep-orange" />
                        <span className="ml-2 font-medium text-sm text-gray-700 dark:text-gray-200">
                          Contact
                        </span>
                      </a>
                    </Link>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {() => (
                    <Link href="/report">
                      <a className="flex items-center hover:bg-orange-100 px-2 py-1 my-1 rounded-full dark:hover:bg-opacity-25">
                        <FlagIcon className="w-6 h-6 text-deep-orange" />
                        <span className="ml-2 font-medium text-sm text-gray-700 dark:text-gray-200">
                          Report
                        </span>
                      </a>
                    </Link>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {() => (
                    <Link href="/terms">
                      <a className="flex items-center hover:bg-orange-100 px-2 py-1 my-1 rounded-full dark:hover:bg-opacity-25">
                        <BookOpenIcon className="w-6 h-6 text-deep-orange" />
                        <span className="ml-2 font-medium text-sm text-gray-700 dark:text-gray-200">
                          Terms
                        </span>
                      </a>
                    </Link>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {() => (
                    <Link href="/privacy">
                      <a className="flex items-center hover:bg-orange-100 px-2 py-1 my-1 rounded-full dark:hover:bg-opacity-25">
                        <LockClosedIcon className="w-6 h-6 text-deep-orange" />
                        <span className="ml-2 font-medium text-sm text-gray-700 dark:text-gray-200">
                          Privacy
                        </span>
                      </a>
                    </Link>
                  )}
                </Menu.Item>
              </div>

              <div className="px-2 py-1">
                <Menu.Item>
                  {() => (
                    <Link href="/status">
                      <a className="flex items-center hover:bg-orange-100 px-2 py-1 my-1 rounded-full dark:hover:bg-opacity-25">
                        <CloudIcon className="w-6 h-6 text-deep-orange" />
                        <span className="ml-2 font-medium text-sm text-gray-700 dark:text-gray-200">
                          Status
                        </span>
                      </a>
                    </Link>
                  )}
                </Menu.Item>
              </div>

              <div className="px-4 py-1 flex items-center text-sm space-x-1">
                <span className="text-slate-700 dark:text-gray-200">
                  Vevericka
                </span>
                <span className="text-deep-orange">&copy;</span>
                <span className="text-slate-700 dark:text-gray-200">
                  {new Date().getFullYear()}
                </span>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </nav>
  );
};

export default AppBar;
