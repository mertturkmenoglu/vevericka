import { ChatAltIcon, ThumbDownIcon, ThumbUpIcon } from '@heroicons/react/outline';
import { FeedPost, LikeStatus } from '@services/index';
import { getNumberFormatter } from '@utils/index';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import ActionButton from './ActionButton';
import { useLike } from './useLike.hook';

export interface ActionsProps {
  post: FeedPost;
}

function Actions({ post }: ActionsProps): JSX.Element {
  const { like, dislike } = useLike(post);

  const router = useRouter();
  const numberFormatter = useMemo(() => getNumberFormatter(router.locale), [router]);

  return (
    <div className="mt-4 flex w-full items-center justify-between">
      <div className="flex">
        <ActionButton
          count={numberFormatter.format(post._count.likes)}
          onClick={like}
          status={post.likeStatus === LikeStatus.LIKED}
          icon={ThumbUpIcon}
        />

        <ActionButton
          count={numberFormatter.format(post._count.dislikes)}
          onClick={dislike}
          status={post.likeStatus === LikeStatus.DISLIKED}
          icon={ThumbDownIcon}
          className="ml-4"
        />
      </div>
      <div className="flex items-center">
        <Link href={`/post/${post.id}`}>
          <a className="flex items-center">
            <ChatAltIcon className="ml-4 h-8 w-8 text-primary" />
            <span className="ml-1 text-midnight hover:underline dark:text-gray-400">
              {numberFormatter.format(post._count.comments)} <span className="sr-only">comments</span>
            </span>
          </a>
        </Link>
      </div>
    </div>
  );
}

export default Actions;
