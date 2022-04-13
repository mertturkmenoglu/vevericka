import React, { useEffect, useMemo, useState } from 'react';
import { useSession } from 'next-auth/react';
import clsx from 'clsx';
import { ArrowCircleDownIcon, ArrowCircleUpIcon, ChatAltIcon } from '@heroicons/react/outline';
import { LikeStatus } from '@service/common/models';
import { FeedPost } from '@service/common/models/FeedPost';
import { PostApi } from '@service/post/PostApi';
import { useQueryClient } from 'react-query';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { getNumberFormatter } from '@utils/misc';

export interface PostCardActionsProps {
  post: FeedPost;
}

const PostCardActions: React.FC<PostCardActionsProps> = ({ post }) => {
  const [postApi, setPostApi] = useState<PostApi | null>(null);

  const { data: session, status: authStatus } = useSession();
  const router = useRouter();
  const queryClient = useQueryClient();
  const numberFormatter = useMemo(() => getNumberFormatter(router.locale), [router]);

  useEffect(() => {
    if (authStatus !== 'authenticated' || !session) {
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
        <button className="flex items-center" onClick={likePost}>
          <ArrowCircleUpIcon
            className={clsx('h-4 w-4', 'text-midnight dark:text-white', {
              'text-primary dark:text-primary': post.likeStatus === LikeStatus.LIKED,
            })}
          />
          <span className="ml-1 text-sm text-midnight dark:text-white">
            {numberFormatter.format(post._count.likes)}
          </span>
        </button>
        <button className="ml-4 flex items-center" onClick={dislikePost}>
          <ArrowCircleDownIcon
            className={clsx('h-4 w-4', 'text-midnight dark:text-white', {
              'text-primary dark:text-primary': post.likeStatus === LikeStatus.DISLIKED,
            })}
          />
          <span className="ml-1 text-sm text-midnight dark:text-white">
            {numberFormatter.format(post._count.dislikes)}
          </span>
        </button>
      </div>
      <div className="flex items-center">
        <Link href={`/post/${post.id}`}>
          <a className="flex items-center">
            <ChatAltIcon className="ml-4 h-4 w-4 text-primary" />
            <span className="ml-1 text-sm text-midnight hover:underline dark:text-gray-400">
              {numberFormatter.format(post._count.comments)} <span className="sr-only">comments</span>
            </span>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default PostCardActions;
