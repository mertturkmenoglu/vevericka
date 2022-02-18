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
      <Menu as="div" className="relative inline-block w-min text-left">
        <div>
          <Menu.Button className="m-0 flex items-center justify-center">
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
            className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-sm ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-neutral-700"
          >
            <div className="px-1 py-1">
              <Menu.Item>
                {() => (
                  <Link href={`/user/${appContext.user.username}`}>
                    <a className="flex">
                      <img
                        src={image}
                        className="m-2 h-10 w-10 rounded-full"
                        alt="User image"
                      />
                      <div className="mt-2 flex flex-col">
                        <span className="text-sm font-medium text-primary">
                          @{appContext.user.username}
                        </span>
                        <span className="text-xs font-light text-gray-500 dark:text-gray-400">
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
                    <a className="my-1 flex items-center rounded-full px-2 py-1 hover:bg-primary hover:bg-opacity-10 dark:hover:bg-opacity-25">
                      <HashtagIcon className="text-deep-orange h-6 w-6" />
                      <span className="ml-2 text-sm font-medium text-midnight dark:text-gray-200">
                        Explore
                      </span>
                    </a>
                  </Link>
                )}
              </Menu.Item>

              <Menu.Item>
                {() => (
                  <Link href="/bookmarks">
                    <a className="my-1 flex items-center rounded-full px-2 py-1 hover:bg-primary hover:bg-opacity-10 dark:hover:bg-opacity-25">
                      <BookmarkIcon className="text-deep-orange h-6 w-6" />
                      <span className="ml-2 text-sm font-medium text-midnight dark:text-gray-200">
                        Bookmarks
                      </span>
                    </a>
                  </Link>
                )}
              </Menu.Item>

              <Menu.Item>
                {() => (
                  <Link href="/settings">
                    <a className="my-1 flex items-center rounded-full px-2 py-1 hover:bg-primary hover:bg-opacity-10 dark:hover:bg-opacity-25">
                      <CogIcon className="text-deep-orange h-6 w-6" />
                      <span className="ml-2 text-sm font-medium text-midnight dark:text-gray-200">
                        Settings
                      </span>
                    </a>
                  </Link>
                )}
              </Menu.Item>

              <Menu.Item>
                {() => (
                  <div className="my-1 flex items-center justify-between rounded-full px-2 py-1 hover:bg-primary hover:bg-opacity-10 dark:hover:bg-opacity-25">
                    <div className="flex items-center">
                      <SunIcon className="text-deep-orange h-6 w-6" />
                      <span className="ml-2 text-sm font-medium text-midnight dark:text-gray-200">
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
                        'relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out',
                        {
                          'bg-primary': theme === 'dark',
                          'bg-primary bg-opacity-10': theme !== 'dark',
                        }
                      )}
                    >
                      <span className="sr-only">Dark Theme</span>
                      <span
                        aria-hidden="true"
                        className={`${
                          theme === 'dark' ? 'translate-x-5' : 'translate-x-1'
                        }
            pointer-events-none mt-0.5 inline-block h-3 w-3 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                      />
                    </Switch>
                  </div>
                )}
              </Menu.Item>

              <Menu.Item>
                {() => (
                  <button
                    className="my-1 flex w-full items-center rounded-full px-2 py-1 hover:bg-primary hover:bg-opacity-10 dark:hover:bg-opacity-25"
                    onClick={async () => await signOut()}
                  >
                    <LogoutIcon className="text-deep-orange h-6 w-6" />
                    <span className="ml-2 text-sm font-medium text-midnight dark:text-gray-200">
                      Logout
                    </span>
                  </button>
                )}
              </Menu.Item>

              <Menu.Item>
                {() => (
                  <button
                    className="my-1 flex w-full items-center rounded-full px-2 py-1 hover:bg-primary hover:bg-opacity-10 dark:hover:bg-opacity-25"
                    onClick={() => setIsLanguageDialogOpen(true)}
                  >
                    <TranslateIcon className="text-deep-orange h-6 w-6" />
                    <span className="ml-2 text-sm font-medium text-midnight dark:text-gray-200">
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
                    <a className="my-1 flex items-center rounded-full px-2 py-1 hover:bg-primary hover:bg-opacity-10 dark:hover:bg-opacity-25">
                      <QuestionMarkCircleIcon className="text-deep-orange h-6 w-6" />
                      <span className="ml-2 text-sm font-medium text-midnight dark:text-gray-200">
                        Help
                      </span>
                    </a>
                  </Link>
                )}
              </Menu.Item>

              <Menu.Item>
                {() => (
                  <Link href="/contact">
                    <a className="my-1 flex items-center rounded-full px-2 py-1 hover:bg-primary hover:bg-opacity-10 dark:hover:bg-opacity-25">
                      <AtSymbolIcon className="text-deep-orange h-6 w-6" />
                      <span className="ml-2 text-sm font-medium text-midnight dark:text-gray-200">
                        Contact
                      </span>
                    </a>
                  </Link>
                )}
              </Menu.Item>

              <Menu.Item>
                {() => (
                  <Link href="/report">
                    <a className="my-1 flex items-center rounded-full px-2 py-1 hover:bg-primary hover:bg-opacity-10 dark:hover:bg-opacity-25">
                      <FlagIcon className="text-deep-orange h-6 w-6" />
                      <span className="ml-2 text-sm font-medium text-midnight dark:text-gray-200">
                        Report
                      </span>
                    </a>
                  </Link>
                )}
              </Menu.Item>

              <Menu.Item>
                {() => (
                  <Link href="/terms">
                    <a className="my-1 flex items-center rounded-full px-2 py-1 hover:bg-primary hover:bg-opacity-10 dark:hover:bg-opacity-25">
                      <BookOpenIcon className="text-deep-orange h-6 w-6" />
                      <span className="ml-2 text-sm font-medium text-midnight dark:text-gray-200">
                        Terms
                      </span>
                    </a>
                  </Link>
                )}
              </Menu.Item>

              <Menu.Item>
                {() => (
                  <Link href="/privacy">
                    <a className="my-1 flex items-center rounded-full px-2 py-1 hover:bg-primary hover:bg-opacity-10 dark:hover:bg-opacity-25">
                      <LockClosedIcon className="text-deep-orange h-6 w-6" />
                      <span className="ml-2 text-sm font-medium text-midnight dark:text-gray-200">
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
                    <a className="my-1 flex items-center rounded-full px-2 py-1 hover:bg-primary hover:bg-opacity-10 dark:hover:bg-opacity-25">
                      <CloudIcon className="text-deep-orange h-6 w-6" />
                      <span className="ml-2 text-sm font-medium text-midnight dark:text-gray-200">
                        Status
                      </span>
                    </a>
                  </Link>
                )}
              </Menu.Item>
            </div>

            <div className="flex items-center space-x-1 px-4 py-1 text-sm">
              <span className="text-midnight dark:text-gray-200">
                Vevericka
              </span>
              <span className="text-primary">&copy;</span>
              <span className="text-midnight dark:text-gray-200">
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
              <div className="my-8 inline-block w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-neutral-800">
                <Dialog.Title
                  as="h3"
                  className="text-deep-orange flex items-center text-lg font-medium leading-6"
                >
                  <TranslateIcon className="h-8 w-8" />
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
                          className="relative flex cursor-pointer rounded-md bg-white px-5 py-3 focus:outline-none dark:bg-neutral-700"
                        >
                          {({ checked }) => (
                            <>
                              <div className="flex w-full items-center justify-between">
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
                                  <div className="text-deep-orange flex-shrink-0">
                                    <CheckIcon className="h-4 w-4" />
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
                    className="text-deep-orange dark:border-deep-orange dark:hover:bg-deep-orange inline-flex items-center justify-center rounded-md bg-white px-4 py-1 text-sm font-medium transition delay-75 ease-in-out dark:border dark:bg-neutral-800 dark:hover:text-white"
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
