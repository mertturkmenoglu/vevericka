import { Avatar } from '@atom/index';
import { BadgeCheckIcon } from '@heroicons/react/outline';
import { useUserImage } from '@hooks/index';
import { FeedPost } from '@services/post';
import Link from 'next/link';
import React from 'react';
import { usePostCard } from './usePostCard.hook';

export interface TitleProps {
  post: FeedPost;
}

function Title({ post }: TitleProps): JSX.Element {
  const image = useUserImage(post.user.image);
  const { formattedDate } = usePostCard(post);

  return (
    <div className="flex items-center">
      <Link href={`/user/${post.user.username}`}>
        <a>
          <Avatar
            src={image}
            label={post.user.name}
            appearance="circle"
            size="large"
          />
        </a>
      </Link>
      <Link href={`/user/${post.user.username}`}>
        <a className="ml-2">
          <div className="flex items-center">
            <p className="text-xl hover:underline">{post.user.name}</p>
            {post.user.verified && <BadgeCheckIcon className="ml-1 mt-1 h-4 w-4 text-primary" />}
          </div>

          <Link href={`/post/${post.id}`}>
            <a className="text-xs text-slate-700 hover:underline dark:text-paper-200">{formattedDate}</a>
          </Link>
        </a>
      </Link>
    </div>
  );
}

export default Title;
