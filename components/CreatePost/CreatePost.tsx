import React from 'react';
import CreatePostAction from './CreatePostAction';
import CreatePostTitle from './CreatePostTitle';

export interface CreatePostProps {
  image: string;
  name: string;
  username: string;
  openModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreatePost: React.FC<CreatePostProps> = ({ image, name, username, openModal }) => {
  return (
    <div className="group rounded-lg">
      <div className="flex justify-between">
        <CreatePostTitle image={image} name={name} username={username} openModal={openModal} />
      </div>
      <div className="mt-4 w-full">
        <CreatePostAction />
      </div>
    </div>
  );
};

export default CreatePost;
