import {
  Dialog,
  Menu,
  RadioGroup,
  Switch,
  Transition,
} from '@headlessui/react';
import {
  AtSymbolIcon,
  BookmarkIcon,
  BookOpenIcon,
  CheckIcon,
  ChevronDownIcon,
  CloudIcon,
  CogIcon,
  FlagIcon,
  HashtagIcon,
  LockClosedIcon,
  LogoutIcon,
  QuestionMarkCircleIcon,
  SunIcon,
  TranslateIcon,
} from '@heroicons/react/outline';
import Link from 'next/link';
import { Fragment, useContext, useEffect, useMemo, useState } from 'react';
import { ApplicationContext } from '../context/ApplicationContext';
import { useForceUpdate } from '../hooks/useForceUpdate';
import { LocalStorage } from '../utils/LocalStorage';
import { useTheme } from 'next-themes';
import clsx from 'clsx';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/router';

export interface AppBarMenuProps {}

const AppBarMenu: React.FC<AppBarMenuProps> = ({}) => {
  const appContext = useContext(ApplicationContext);
  const forceUpdate = useForceUpdate();
  const { setTheme, theme } = useTheme();

  const [isLanguageDialogOpen, setIsLanguageDialogOpen] = useState(false);
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState(
    router.locale || 'en'
  );

  const image = useMemo(() => {
    if (appContext.user.image === 'profile.png') {
      return '/assets/profile.png';
    }

    return appContext.user.image;
  }, [appContext]);

  useEffect(() => {
    const storage = new LocalStorage();
    appContext.setIsDarkTheme(storage.isDarkTheme);
    setTheme(storage.isDarkTheme ? 'dark' : 'light');
    //forceUpdate();
  }, [appContext, setTheme]);

  return (
    <>
      <Menu as="div" className="relative inline-block text-left w-min">
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
          <Menu.Items
            static
            className="absolute right-0 w-56 mt-2 origin-top-right bg-white dark:bg-neutral-700 divide-y divide-gray-100 rounded-md shadow-sm ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
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
                  <div className="flex items-center justify-between hover:bg-orange-100 px-2 py-1 my-1 rounded-full dark:hover:bg-opacity-25">
                    <div className="flex items-center">
                      <SunIcon className="w-6 h-6 text-deep-orange" />
                      <span className="ml-2 font-medium text-sm text-gray-700 dark:text-gray-200">
                        Dark Mode
                      </span>
                    </div>
                    <Switch
                      checked={theme === 'dark'}
                      onChange={(value) => {
                        appContext.setIsDarkTheme(value);
                        const storage = new LocalStorage();
                        storage.isDarkTheme = value;
                        setTheme(value ? 'dark' : 'light');
                        forceUpdate();
                      }}
                      className={clsx(
                        'relative inline-flex flex-shrink-0 h-5 w-10 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200',
                        {
                          'bg-deep-orange': theme === 'dark',
                          'bg-orange-200': theme !== 'dark',
                        }
                      )}
                    >
                      <span className="sr-only">Dark Theme</span>
                      <span
                        aria-hidden="true"
                        className={`${
                          theme === 'dark' ? 'translate-x-5' : 'translate-x-1'
                        }
            pointer-events-none inline-block h-3 w-3 rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200 mt-0.5`}
                      />
                    </Switch>
                  </div>
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

              <Menu.Item>
                {() => (
                  <button
                    className="w-full flex items-center hover:bg-orange-100 px-2 py-1 my-1 rounded-full dark:hover:bg-opacity-25"
                    onClick={() => setIsLanguageDialogOpen(true)}
                  >
                    <TranslateIcon className="w-6 h-6 text-deep-orange" />
                    <span className="ml-2 font-medium text-sm text-gray-700 dark:text-gray-200">
                      Display Language
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
      <Transition appear show={isLanguageDialogOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => setIsLanguageDialogOpen(false)}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white dark:bg-neutral-800 shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-deep-orange flex items-center"
                >
                  <TranslateIcon className="w-8 h-8" />
                  <span className="ml-2">Change Display Language</span>
                </Dialog.Title>
                <div className="mt-2">
                  <RadioGroup
                    value={selectedLanguage}
                    onChange={setSelectedLanguage}
                  >
                    <RadioGroup.Label className="sr-only">
                      Languages
                    </RadioGroup.Label>
                    <div className="space-y-2">
                      {['en', 'es', 'tr'].map((lang) => (
                        <RadioGroup.Option
                          key={lang}
                          value={lang}
                          className="relative rounded-md px-5 py-3 cursor-pointer flex focus:outline-none bg-white dark:bg-neutral-700"
                        >
                          {({ checked }) => (
                            <>
                              <div className="flex items-center justify-between w-full">
                                <div className="flex items-center">
                                  <div className="text-sm">
                                    <RadioGroup.Label
                                      as="p"
                                      className={`font-medium  ${
                                        checked
                                          ? 'text-deep-orange'
                                          : 'text-slate-700 dark:text-gray-400'
                                      }`}
                                    >
                                      {lang}
                                    </RadioGroup.Label>
                                  </div>
                                </div>
                                {checked && (
                                  <div className="flex-shrink-0 text-deep-orange">
                                    <CheckIcon className="w-4 h-4" />
                                  </div>
                                )}
                              </div>
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                <div className="mt-4 flex justify-center">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-1 text-sm font-medium text-deep-orange bg-white dark:border dark:border-deep-orange dark:bg-neutral-800 rounded-md dark:hover:bg-deep-orange dark:hover:text-white transition ease-in-out delay-75 items-center"
                    onClick={async () => {
                      await router.push(router.route, router.route, {
                        locale: selectedLanguage,
                      });
                      setIsLanguageDialogOpen(false);
                    }}
                  >
                    Change
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default AppBarMenu;
