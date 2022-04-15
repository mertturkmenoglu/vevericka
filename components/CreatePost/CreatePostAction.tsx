import React, { useState } from 'react';
import { ArrowRightIcon, PhotographIcon, VideoCameraIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import { useQueryClient } from 'react-query';
import { PostApi } from '@service/post/PostApi';
import { addResourceBundles } from '@utils/index';
import Tooltip from '@components/Tooltip';
import Button from '@atom/Button';
import constants from './CreatePost.constants';
import { translations } from './CreatePost.i18n';

export interface CreatePostActionProps {}

const CreatePostAction: React.FC<CreatePostActionProps> = () => {
  const { t, i18n } = useTranslation(constants.I18N_NS);
  addResourceBundles(i18n, constants.I18N_NS, translations);
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const createPost = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setIsLoading(true);

    if (!session) {
      setIsLoading(false);
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
      setIsLoading(false);
      return;
    }

    queryClient.invalidateQueries('feed');
    queryClient.refetchQueries('feed');
    setText('');
    setIsLoading(false);
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

        <Button
          appearance="primary"
          text={t('post')}
          onClick={createPost}
          loading={isLoading}
          className="rounded-full py-1 text-sm"
        />
      </div>
    </>
  );
};

export default CreatePostAction;
