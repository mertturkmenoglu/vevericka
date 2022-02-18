import { Dialog, Menu, RadioGroup, Transition } from '@headlessui/react';
import { CheckIcon, TranslateIcon } from '@heroicons/react/outline';
import { Fragment, useContext, useEffect, useMemo, useState } from 'react';
import { ApplicationContext } from '../../../../context/ApplicationContext';
import { LocalStorage } from '../../../../utils/LocalStorage';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/router';
import MenuIcon from './MenuIcon';
import MenuItems from './MenuItems';
import { useTranslation } from 'next-i18next';
import constants from '../../AppBar.constants';
import { addResourceBundles } from '../../../../utils/addResourceBundles';
import translations from '../../AppBar.i18n';
import { availableLanguages } from '../../../../utils/AvailableLanguages';

export interface AppBarMenuProps {}

const AppBarMenu: React.FC<AppBarMenuProps> = ({}) => {
  const { t, i18n } = useTranslation(constants.I18N_NS);
  addResourceBundles(i18n, constants.I18N_NS, translations);
  const appContext = useContext(ApplicationContext);
  const { setTheme } = useTheme();

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
  }, [appContext, setTheme]);

  return (
    <>
      <Menu as="div" className="relative inline-block w-min text-left">
        <MenuIcon altText="Menu" ariaHidden={true} />
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
            <MenuItems
              username={appContext.user.username}
              userImage={image}
              toggleLanguageDialog={setIsLanguageDialogOpen}
            />
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
                  <span className="ml-2">{t('languageDialog.title')}</span>
                </Dialog.Title>
                <div className="mt-2">
                  <RadioGroup
                    value={selectedLanguage}
                    onChange={setSelectedLanguage}
                  >
                    <RadioGroup.Label className="sr-only">
                      {t('languageDialog.languages')}
                    </RadioGroup.Label>
                    <div className="space-y-2">
                      {availableLanguages.map((lang) => (
                        <RadioGroup.Option
                          key={lang.key}
                          value={lang.key}
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
                                      {lang.name}
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
                    {t('languageDialog.change')}
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
