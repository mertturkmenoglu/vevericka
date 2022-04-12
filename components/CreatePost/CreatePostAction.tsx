import React, { useState } from 'react';
import { addResourceBundles } from '@utils/index';
import { useTranslation } from 'next-i18next';
import clsx from 'clsx';
import Tooltip from '@components/Tooltip';
import { PhotographIcon, VideoCameraIcon } from '@heroicons/react/outline';
import { useSession } from 'next-auth/react';
import { useQueryClient } from 'react-query';
import { PostApi } from '@service/post/PostApi';
import { translations } from './CreatePost.i18n';
import constants from './CreatePost.constants';

export interface CreatePostActionProps {}

const CreatePostAction: React.FC<CreatePostActionProps> = () => {
  const { t, i18n } = useTranslation(constants.I18N_NS);
  addResourceBundles(i18n, constants.I18N_NS, translations);
  const [text, setText] = useState('');

  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const createPost = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (!session) {
      return;
    }

    const postApi = new PostApi(session.jwt);
    const response = await postApi.createPost({
      content: text,
      username: session.username,
      images: [],
      videos: [],
    });

    if (!response) {
      return;
    }

    queryClient.invalidateQueries('feed');
    queryClient.refetchQueries('feed');
    setText('');
  };

  return (
    <>
      <textarea
        placeholder={t('textAreaPlaceholder')}
        className={clsx(
          'w-full resize-none',
          'border-b border-b-black dark:border-b-gray-400',
          'py-1 px-2',
          'focus:outline-none',
          'bg-transparent dark:bg-neutral-700',
          'text-midnight dark:text-gray-200',
        )}
        rows={1}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="mt-2 flex w-full items-center justify-between">
        <div className="flex items-center">
          <Tooltip position="bottom" text={t('addImageTooltip')}>
            <button className="mx-1">
              <PhotographIcon className="h-8 w-8 rounded-full p-1 text-primary hover:bg-primary hover:bg-opacity-20" />
            </button>
          </Tooltip>

          <Tooltip position="bottom" text={t('addVideoTooltip')}>
            <button className="mx-1">
              <VideoCameraIcon className="h-8 w-8 rounded-full p-1 text-primary hover:bg-primary hover:bg-opacity-20" />
            </button>
          </Tooltip>
        </div>

        <button className="text-sm font-medium text-midnight dark:text-gray-400" onClick={createPost}>
          {t('post')}
        </button>
      </div>
    </>
  );
};

export default CreatePostAction;
