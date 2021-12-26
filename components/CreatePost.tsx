import { useState } from 'react';

export interface CreatePostProps {
  image: string;
  name: string;
  username: string;
}

const CreatePost: React.FC<CreatePostProps> = ({ image, name, username }) => {
  const [text, setText] = useState('');

  return (
    <>
      <div className="flex w-full items-center">
        <img
          src={image}
          alt="User picture"
          className="w-16 h-16 rounded-full"
        />
        <div className="flex flex-col ml-2">
          <span className="font-medium text-xl text-gray-800 dark:text-gray-200">
            {name}
          </span>
          <span className="text-deep-orange text-lg">@{username}</span>
        </div>
      </div>
      <div className="w-full mt-4">
        <textarea
          placeholder="Say what you must don't leave it there"
          className="border-b border-b-black focus:outline-none resize-none w-full py-2 px-2 dark:bg-neutral-700 dark:border-b-gray-400 dark:text-gray-200"
          rows={1}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="w-full flex justify-end">
          <button className="text-slate-700 dark:text-gray-400">Post</button>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
