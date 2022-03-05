import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useState } from 'react';
import { useTranslation } from 'next-i18next';
import constants from './CreatePostModal.constants';
import { addResourceBundles } from '../../utils/addResourceBundles';
import translations from './CreatePostModal.i18n';
import {
  CalendarIcon,
  LocationMarkerIcon,
  PhotographIcon,
  VideoCameraIcon,
  XIcon,
} from '@heroicons/react/outline';
import Tooltip from '../Tooltip';

export interface CreatePostModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const { t, i18n } = useTranslation(constants.I18N_NS);
  addResourceBundles(i18n, constants.I18N_NS, translations);

  const [text, setText] = useState('');

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={() => setIsOpen(false)}
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
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50" />
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
            <div className="inline-block w-full max-w-3xl transform overflow-hidden bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-neutral-800">
              <Dialog.Title
                as="h3"
                className="flex justify-end font-medium leading-6"
              >
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex items-start"
                >
                  <XIcon className="h-8 w-8 text-midnight dark:text-white" />
                </button>
              </Dialog.Title>
              <div className="mt-2" />

              <div className="mt-4 flex flex-col justify-center">
                <textarea
                  placeholder="Say what you must don't leave it there"
                  className="w-full resize-none border-b border-b-black py-2 px-2 focus:outline-none dark:border-b-gray-400 dark:bg-neutral-700 dark:text-gray-200"
                  rows={2}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                <div className="mt-4 flex w-full items-center justify-between">
                  <div className="flex items-center">
                    <Tooltip position="bottom" text="Add Location">
                      <button className="mx-1">
                        <LocationMarkerIcon className="h-8 w-8 rounded-full p-1 text-primary hover:bg-primary hover:bg-opacity-20" />
                      </button>
                    </Tooltip>

                    <Tooltip position="bottom" text="Add image">
                      <button className="mx-1">
                        <PhotographIcon className="h-8 w-8 rounded-full p-1 text-primary hover:bg-primary hover:bg-opacity-20" />
                      </button>
                    </Tooltip>

                    <Tooltip position="bottom" text="Add video">
                      <button className="mx-1">
                        <VideoCameraIcon className="h-8 w-8 rounded-full p-1 text-primary hover:bg-primary hover:bg-opacity-20" />
                      </button>
                    </Tooltip>

                    <Tooltip position="bottom" text="Schedule post">
                      <button className="mx-1">
                        <CalendarIcon className="h-8 w-8 rounded-full p-1 text-primary hover:bg-primary hover:bg-opacity-20" />
                      </button>
                    </Tooltip>
                  </div>

                  <button className="text-slate-700 dark:text-gray-400">
                    Post
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CreatePostModal;
