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
          <span className="font-medium text-xl text-gray-800">{name}</span>
          <span className="text-deep-orange text-lg">@{username}</span>
        </div>
      </div>
      <div className="w-full mt-4">
        <textarea
          placeholder="Say what you must don't leave it there"
          className="border-b border-b-black focus:outline-none resize-none w-full py-2"
          rows={1}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="w-full flex justify-end">
          <button className="">Post</button>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
