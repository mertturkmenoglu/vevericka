import { useMemo, useState } from 'react';
import { CalendarIcon, LocationMarkerIcon, PhotographIcon, VideoCameraIcon } from '@heroicons/react/outline';
import Tooltip from './Tooltip';

export interface CreatePostProps {
  image: string;
  name: string;
  username: string;
}

const CreatePost: React.FC<CreatePostProps> = ({ image, name, username }) => {
  const [text, setText] = useState('');

  const userImage = useMemo(() => {
    if (image === 'profile.png') {
      return '/assets/profile.png';
    }

    return image;
  }, [image]);

  return (
    <>
      <div className="flex w-full items-center">
        <img src={userImage} alt="User picture" className="h-16 w-16 rounded-full" />
        <div className="ml-2 flex flex-col">
          <span className="text-xl font-medium text-gray-800 dark:text-gray-200">{name}</span>
          <span className="text-deep-orange text-lg">@{username}</span>
        </div>
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

          <button className="text-slate-700 dark:text-gray-400">Post</button>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
