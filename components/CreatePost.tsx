import React, { useMemo, useState } from 'react';
import {
  CalendarIcon,
  ExternalLinkIcon,
  LocationMarkerIcon,
  PhotographIcon,
  VideoCameraIcon,
} from '@heroicons/react/outline';
import Tooltip from './Tooltip';
import { useSession } from 'next-auth/react';
import { PostApi } from '../service/post/PostApi';

export interface CreatePostProps {
  image: string;
  name: string;
  username: string;
  openModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreatePost: React.FC<CreatePostProps> = ({ image, name, username, openModal }) => {
  const [text, setText] = useState('');
  const { data } = useSession();

  const userImage = useMemo(() => {
    if (image === 'profile.png') {
      return '/assets/profile.png';
    }

    return image;
  }, [image]);

  const createPost = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();

    if (!data) {
      return;
    }

    const postApi = new PostApi(data.jwt);
    const response = await postApi.createPost({
      content: text,
      username: data.username,
      images: [],
      videos: [],
    });

    if (response) {
      window.location.reload();
    }
  };

  return (
    <div className="group">
      <div className="flex justify-between">
        <div className="flex w-full items-center">
          <img src={userImage} alt="User picture" className="h-16 w-16 rounded-full" />
          <div className="ml-2 flex flex-col">
            <span className="text-xl font-medium text-gray-800 dark:text-gray-200">{name}</span>
            <span className="text-lg text-primary">@{username}</span>
          </div>
        </div>
        <Tooltip position="bottom" text="Open as popup">
          <button
            className="invisible flex items-start group-focus-within:visible group-hover:visible"
            tabIndex={0}
            onClick={() => openModal(true)}
          >
            <ExternalLinkIcon className="h-6 w-6 text-primary" />
          </button>
        </Tooltip>
      </div>
      <div className="mt-4 w-full">
        <textarea
          placeholder="Say what you must don't leave it there"
          className="w-full resize-none border-b border-b-black py-2 px-2 focus:outline-none dark:border-b-gray-400 dark:bg-neutral-700 dark:text-gray-200"
          rows={1}
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

          <button className="text-slate-700 dark:text-gray-400" onClick={createPost}>
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
