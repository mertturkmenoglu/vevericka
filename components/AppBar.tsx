import { Fragment, useState } from 'react';
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

export interface AppBarProps {}

const AppBar: React.FC<AppBarProps> = ({}) => {
  const [darkTheme, setDarkTheme] = useState(false);

  return (
    <nav className="w-screen flex justify-between py-2 px-4">
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
          className="hidden sm:block bg-gray-100 px-4 py-1 rounded-full placeholder:text-gray-400"
        />

        <Link href="/search">
          <a>
            <SearchIcon className="w-12 h-12 text-deep-orange ml-2 hover:bg-orange-100 rounded-full p-2 sm:hidden" />
          </a>
        </Link>

        <Link href="/notifications">
          <a>
            <BellIcon className="w-12 h-12 text-deep-orange ml-2 hover:bg-orange-100 rounded-full p-2" />
          </a>
        </Link>

        <Link href="/messages">
          <a className="">
            <MailIcon className="w-12 h-12 text-deep-orange hover:bg-orange-100 rounded-full p-2" />
          </a>
        </Link>

        <Menu as="div" className="relative inline-block text-left">
          <div>
            <Menu.Button className="">
              <span className="sr-only">Menu</span>
              <ChevronDownIcon
                className="w-12 h-12 text-deep-orange hover:bg-orange-100 rounded-full p-2 mt-2"
                aria-hidden="true"
              />
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
            <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-sm ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="px-1 py-1">
                <Menu.Item>
                  {() => (
                    <Link href="/user/adminmert">
                      <a className="flex">
                        <img
                          src="https://i.pravatar.cc/300?img=3"
                          className="rounded-full w-10 h-10 m-2"
                          alt="User image"
                        />
                        <div className="flex flex-col mt-2">
                          <span className="text-deep-orange font-medium text-sm">
                            @adminmert
                          </span>
                          <span className="text-gray-500 text-xs font-light">
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
                      <a className="flex items-center hover:bg-orange-100 px-2 py-1 my-1 rounded-full">
                        <HashtagIcon className="w-6 h-6 text-deep-orange" />
                        <span className="ml-2 font-medium text-sm text-gray-700">
                          Explore
                        </span>
                      </a>
                    </Link>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {() => (
                    <Link href="/bookmarks">
                      <a className="flex items-center hover:bg-orange-100 px-2 py-1 my-1 rounded-full">
                        <BookmarkIcon className="w-6 h-6 text-deep-orange" />
                        <span className="ml-2 font-medium text-sm text-gray-700">
                          Bookmarks
                        </span>
                      </a>
                    </Link>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {() => (
                    <Link href="/settings">
                      <a className="flex items-center hover:bg-orange-100 px-2 py-1 my-1 rounded-full">
                        <CogIcon className="w-6 h-6 text-deep-orange" />
                        <span className="ml-2 font-medium text-sm text-gray-700">
                          Settings
                        </span>
                      </a>
                    </Link>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {() => (
                    <Link href="/explore">
                      <a className="flex items-center justify-between hover:bg-orange-100 px-2 py-1 my-1 rounded-full">
                        <div className="flex items-center">
                          <SunIcon className="w-6 h-6 text-deep-orange" />
                          <span className="ml-2 font-medium text-sm text-gray-700">
                            Dark Theme
                          </span>
                        </div>
                        <Switch
                          checked={darkTheme}
                          onChange={setDarkTheme}
                          className={clsx(
                            'relative inline-flex flex-shrink-0 h-5 w-10 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200',
                            {
                              'bg-deep-orange': darkTheme,
                              'bg-orange-200': !darkTheme,
                            }
                          )}
                        >
                          <span className="sr-only">Dark Theme</span>
                          <span
                            aria-hidden="true"
                            className={`${
                              darkTheme ? 'translate-x-5' : 'translate-x-1'
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
                      className="w-full flex items-center hover:bg-orange-100 px-2 py-1 my-1 rounded-full"
                      onClick={async () => await signOut()}
                    >
                      <LogoutIcon className="w-6 h-6 text-deep-orange" />
                      <span className="ml-2 font-medium text-sm text-gray-700">
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
                      <a className="flex items-center hover:bg-orange-100 px-2 py-1 my-1 rounded-full">
                        <QuestionMarkCircleIcon className="w-6 h-6 text-deep-orange" />
                        <span className="ml-2 font-medium text-sm text-gray-700">
                          Help
                        </span>
                      </a>
                    </Link>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {() => (
                    <Link href="/contact">
                      <a className="flex items-center hover:bg-orange-100 px-2 py-1 my-1 rounded-full">
                        <AtSymbolIcon className="w-6 h-6 text-deep-orange" />
                        <span className="ml-2 font-medium text-sm text-gray-700">
                          Contact
                        </span>
                      </a>
                    </Link>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {() => (
                    <Link href="/report">
                      <a className="flex items-center hover:bg-orange-100 px-2 py-1 my-1 rounded-full">
                        <FlagIcon className="w-6 h-6 text-deep-orange" />
                        <span className="ml-2 font-medium text-sm text-gray-700">
                          Report
                        </span>
                      </a>
                    </Link>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {() => (
                    <Link href="/terms">
                      <a className="flex items-center hover:bg-orange-100 px-2 py-1 my-1 rounded-full">
                        <BookOpenIcon className="w-6 h-6 text-deep-orange" />
                        <span className="ml-2 font-medium text-sm text-gray-700">
                          Terms
                        </span>
                      </a>
                    </Link>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {() => (
                    <Link href="/privacy">
                      <a className="flex items-center hover:bg-orange-100 px-2 py-1 my-1 rounded-full">
                        <LockClosedIcon className="w-6 h-6 text-deep-orange" />
                        <span className="ml-2 font-medium text-sm text-gray-700">
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
                      <a className="flex items-center hover:bg-orange-100 px-2 py-1 my-1 rounded-full">
                        <CloudIcon className="w-6 h-6 text-deep-orange" />
                        <span className="ml-2 font-medium text-sm text-gray-700">
                          Status
                        </span>
                      </a>
                    </Link>
                  )}
                </Menu.Item>
              </div>

              <div className="px-4 py-1 flex items-center text-sm space-x-1">
                <span>Vevericka</span>
                <span className="text-deep-orange">&copy;</span>
                <span>{new Date().getFullYear()}</span>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </nav>
  );
};

export default AppBar;
