import React, { Fragment, useContext, useState } from 'react';
import clsx from 'clsx';
import { Dialog, Menu, RadioGroup, Transition } from '@headlessui/react';
import { CheckIcon, ChevronDownIcon, TranslateIcon } from '@heroicons/react/outline';
import { useLanguages } from '@hooks/useLanguages';
import setLanguage from 'next-translate/setLanguage';
import useTranslation from 'next-translate/useTranslation';
import MenuItems from './MenuItems';
import { AppContext } from '@context/AppContext';

export interface AppBarMenuProps {
  className?: string;
}

function AppBarMenu({ className }: AppBarMenuProps): JSX.Element {
  const { t } = useTranslation('common');
  const ctx = useContext(AppContext);
  const [isLanguageDialogOpen, setIsLanguageDialogOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const { langs } = useLanguages();

  return (
    <div className={clsx(className)}>
      <>
        <Menu
          as="div"
          className="relative inline-block w-min text-left"
        >
          <Menu.Button className="m-0 flex items-center justify-center">
            <span className="sr-only">{t('appBar.menu.desc')}</span>
            <ChevronDownIcon className="ml-2 h-12 w-12 rounded-full p-2 text-primary hover:bg-primary hover:bg-opacity-10" />
          </Menu.Button>
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
              className="absolute -right-6 mt-6 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-sm ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-neutral-700"
            >
              <MenuItems
                username={ctx.user.username}
                userImage={ctx.user.image}
                toggleLanguageDialog={setIsLanguageDialogOpen}
              />
            </Menu.Items>
          </Transition>
        </Menu>
        <Transition
          appear
          show={isLanguageDialogOpen}
          as={Fragment}
        >
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
                    <span className="ml-2">{t('appBar.menu.languageDialog.title')}</span>
                  </Dialog.Title>
                  <div className="mt-2">
                    <RadioGroup
                      value={selectedLanguage}
                      onChange={setSelectedLanguage}
                    >
                      <RadioGroup.Label className="sr-only">
                        {t('appBar.menu.languageDialog.languages')}
                      </RadioGroup.Label>
                      <div className="space-y-2">
                        {langs.map((lang) => (
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
                                          checked ? 'text-deep-orange' : 'text-slate-700 dark:text-gray-400'
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
                        setLanguage(selectedLanguage);
                        setIsLanguageDialogOpen(false);
                      }}
                    >
                      {t('appBar.menu.languageDialog.change')}
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </>
    </div>
  );
}

export default AppBarMenu;
