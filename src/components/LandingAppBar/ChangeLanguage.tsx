import React, { Fragment } from 'react';
import setLanguage from 'next-translate/setLanguage';
import { Menu, Transition } from '@headlessui/react';
import { LanguageIcon } from '@heroicons/react/24/outline';
import { useLanguages } from '@hooks/index';
import useTranslation from 'next-translate/useTranslation';
import clsx from 'clsx';

function ChangeLanguage(): JSX.Element {
  const { langs } = useLanguages();
  const { t } = useTranslation('landing');

  return (
    <Menu
      as="div"
      className="relative inline-block text-left"
    >
      <div className="flex items-center">
        <Menu.Button>
          <span className="sr-only">{t('appBar.changeLanguage')}</span>
          <LanguageIcon className="h-8 w-8 text-midnight dark:text-white" />
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
          className={clsx(
            'absolute -left-16 top-16',
            'mt-2 w-56',
            'origin-top-right divide-y divide-gray-100 rounded-md',
            'bg-white shadow-lg ring-1 ring-black ring-opacity-5',
            'focus:outline-none dark:bg-neutral-800 dark:text-white',
            'sm:right-0 sm:top-14'
          )}
        >
          <div className="px-1 py-1 ">
            {langs.map(({ key, name }) => (
              <Menu.Item key={key}>
                {() => (
                  <button
                    className={clsx(
                      'group',
                      'flex items-center',
                      'w-full rounded-md px-2 py-2',
                      'text-sm text-midnight dark:text-white',
                      'hover:bg-neutral-100 dark:hover:bg-neutral-700'
                    )}
                    onClick={async (event) => {
                      event.preventDefault();
                      setLanguage(key);
                    }}
                  >
                    {name}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export default ChangeLanguage;
