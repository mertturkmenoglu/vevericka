import { Avatar } from '@atom/Avatar';
import { FeedPost } from '@services/index';
import clsx from 'clsx';
import Link from 'next/link';
import { BadgeCheckIcon } from '@heroicons/react/outline';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
import { useRouterDateLocale, useUserImage } from '@hooks/index';
import { useMemo } from 'react';

export interface PostCardProps {
  post: FeedPost;
}

function PostCard({ post }: PostCardProps): JSX.Element {
  const image = useUserImage(post.user.image);
  const dateLocal = useRouterDateLocale();

  const formattedDate = useMemo(() => {
    return formatDistanceToNowStrict(new Date(post.createdAt), { locale: dateLocal, addSuffix: true });
  }, [post, dateLocal]);

  return (
    <article
      key={post.id}
      className={clsx(
        'flex flex-col',
        'bg-white dark:bg-neutral-800',
        'w-full',
        'px-2 pt-2',
        'dark:rounded-md',
        'dark:pb-2'
      )}
    >
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

      <div className="mt-4 ml-2">{post.content}</div>
    </article>
  );
}

export default PostCard;
