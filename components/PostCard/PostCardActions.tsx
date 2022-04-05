import { ArrowCircleDownIcon, ArrowCircleUpIcon, ChatAltIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import React from 'react';
import { LikeStatus } from '../../service/common/models';
import { FeedPost } from '../../service/common/models/FeedPost';

export interface PostCardActionsProps {
  post: FeedPost;
}

const PostCardActions: React.FC<PostCardActionsProps> = ({ post }) => {
  return (
    <div className="mt-4 flex w-full items-center justify-between">
      <div className="flex">
        <button className="flex">
          <ArrowCircleUpIcon
            className={clsx('h-6 w-6', 'text-midnight dark:text-white', {
              'text-primary dark:text-primary': post.likeStatus === LikeStatus.LIKED,
            })}
          />
          <span className="ml-1 text-midnight dark:text-white">{post._count.likes}</span>
        </button>
        <button className="ml-4 flex">
          <ArrowCircleDownIcon
            className={clsx('h-6 w-6', 'text-midnight dark:text-white', {
              'text-primary dark:text-primary': post.likeStatus === LikeStatus.DISLIKED,
            })}
          />
          <span className="ml-1 text-midnight dark:text-white">{post._count.dislikes}</span>
        </button>
      </div>
      <div className="flex items-center">
        <button className="flex items-center">
          <ChatAltIcon className="ml-4 h-6 w-6 text-primary" />
          <span className="ml-1 text-midnight dark:text-gray-400">
            {post._count.comments} <span className="sr-only">comments</span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default PostCardActions;
