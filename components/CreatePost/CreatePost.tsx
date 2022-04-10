import React from 'react';
import CreatePostTitle from './CreatePostTitle';
import CreatePostAction from './CreatePostAction';

export interface CreatePostProps {
  image: string;
  name: string;
  username: string;
  openModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreatePost: React.FC<CreatePostProps> = ({ image, name, username, openModal }) => {
  return (
    <div className="group">
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
