import { useMemo, useState } from 'react';

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
        <img
          src={userImage}
          alt="User picture"
          className="h-16 w-16 rounded-full"
        />
        <div className="ml-2 flex flex-col">
          <span className="text-xl font-medium text-gray-800 dark:text-gray-200">
            {name}
          </span>
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
        <div className="flex w-full justify-end">
          <button className="text-slate-700 dark:text-gray-400">Post</button>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
