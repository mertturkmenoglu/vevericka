import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import clsx from 'clsx';
import { ArrowCircleDownIcon, ArrowCircleUpIcon, ChatAltIcon } from '@heroicons/react/outline';
import { LikeStatus } from '../../service/common/models';
import { FeedPost } from '../../service/common/models/FeedPost';
import { PostApi } from '../../service/post/PostApi';
import { useQueryClient } from 'react-query';
import Link from 'next/link';

export interface PostCardActionsProps {
  post: FeedPost;
}

const PostCardActions: React.FC<PostCardActionsProps> = ({ post }) => {
  const { data: session, status: authStatus } = useSession();
  const [postApi, setPostApi] = useState<PostApi | null>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (authStatus !== 'authenticated') {
      return;
    }

    setPostApi(new PostApi(session.jwt));
  }, [session, authStatus, setPostApi]);

  const likePost = async () => {
    if (!postApi) {
      return;
    }

    if (post.likeStatus === LikeStatus.LIKED) {
      await postApi.likeNone(post.id);
    } else {
      await postApi.likePost(post.id);
    }

    queryClient.invalidateQueries('feed');
    queryClient.refetchQueries('feed');
  };

  const dislikePost = async () => {
    if (!postApi) {
      return;
    }

    if (post.likeStatus === LikeStatus.DISLIKED) {
      await postApi.likeNone(post.id);
    } else {
      await postApi.dislikePost(post.id);
    }

    queryClient.invalidateQueries('feed');
    queryClient.refetchQueries('feed');
  };

  return (
    <div className="mt-4 flex w-full items-center justify-between">
      <div className="flex">
        <button className="flex" onClick={likePost}>
          <ArrowCircleUpIcon
            className={clsx('h-6 w-6', 'text-midnight dark:text-white', {
              'text-primary dark:text-primary': post.likeStatus === LikeStatus.LIKED,
            })}
          />
          <span className="ml-1 text-midnight dark:text-white">{post._count.likes}</span>
        </button>
        <button className="ml-4 flex" onClick={dislikePost}>
          <ArrowCircleDownIcon
            className={clsx('h-6 w-6', 'text-midnight dark:text-white', {
              'text-primary dark:text-primary': post.likeStatus === LikeStatus.DISLIKED,
            })}
          />
          <span className="ml-1 text-midnight dark:text-white">{post._count.dislikes}</span>
        </button>
      </div>
      <div className="flex items-center">
        <Link href={`/post/${post.id}`}>
          <a className="flex items-center">
            <ChatAltIcon className="ml-4 h-6 w-6 text-primary" />
            <span className="ml-1 text-midnight hover:underline dark:text-gray-400">
              {post._count.comments} <span className="sr-only">comments</span>
            </span>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default PostCardActions;
