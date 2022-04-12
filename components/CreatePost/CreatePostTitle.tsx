import { useTranslation } from 'next-i18next';
import React, { useMemo } from 'react';
import { addResourceBundles } from '@utils/index';
import Tooltip from '@components/Tooltip';
import { ExternalLinkIcon } from '@heroicons/react/outline';
import { translations } from './CreatePost.i18n';
import constants from './CreatePost.constants';

export interface CreatePostTitleProps {
  image: string;
  name: string;
  username: string;
  openModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreatePostTitle: React.FC<CreatePostTitleProps> = ({ image, name, username, openModal }) => {
  const { t, i18n } = useTranslation(constants.I18N_NS);
  addResourceBundles(i18n, constants.I18N_NS, translations);
  const userImage = useMemo(() => (image === 'profile.png' ? '/assets/profile.png' : image), [image]);

  return (
    <>
      <div className="flex w-full items-center">
        <img src={userImage} alt={t('userPicture')} className="h-16 w-16 rounded-full" />
        <div className="ml-2 flex flex-col">
          <span className="text-xl font-normal text-midnight dark:text-gray-200">{name}</span>
          <span className="text-lg text-primary">@{username}</span>
        </div>
      </div>
      <Tooltip position="bottom" text={t('openAsPopup')}>
        <button
          className="invisible flex items-start group-focus-within:visible group-hover:visible"
          tabIndex={0}
          onClick={() => openModal(true)}
        >
          <ExternalLinkIcon className="h-6 w-6 text-primary" />
        </button>
      </Tooltip>
    </>
  );
};

export default CreatePostTitle;
