import React, { useMemo } from 'react';
import Link from 'next/link';
import { FeedPost } from '../../service/common/models/FeedPost';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
import { useRouter } from 'next/router';
import { getDateLocaleFromRouterLocale, getUrl } from '../../utils';
import PostCardMenu from './PostCardMenu';
import { copyToClipboard } from '../../utils/Post.utils';
import { toast } from 'react-toastify';
import { ClipboardCopyIcon } from '@heroicons/react/outline';
import { BadgeCheckIcon } from '@heroicons/react/solid';
import { useTheme } from 'next-themes';

export interface PostCardTitleProps {
  post: FeedPost;
}

const PostCardTitle: React.FC<PostCardTitleProps> = ({ post }) => {
  const router = useRouter();
  const { theme } = useTheme();

  const image = useMemo(() => {
    if (post.user.image === 'profile.png') {
      return '/assets/profile.png';
    }

    return post.user.image;
  }, [post]);

  const dateLocal = useMemo(() => {
    return getDateLocaleFromRouterLocale(router.locale);
  }, [router]);

  const onShareClick = () => {
    const base = getUrl();
    const text = `${base}/post/${post.id}`;
    copyToClipboard(text);

    toast.info('Link copied to your clipboard', {
      position: 'bottom-right',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      icon: <ClipboardCopyIcon className="h-8 w-8 text-primary" />,
      theme: theme === 'dark' ? 'dark' : 'light',
    });
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <Link href={`/user/${post.user.username}`}>
          <a>
            <img src={image} alt={post.user.name} className="h-10 w-10 rounded-full" />
          </a>
        </Link>
        <div className="ml-2 flex flex-col justify-center">
          <Link href={`/user/${post.user.username}`}>
            <a className="flex items-center text-xl text-midnight hover:underline dark:text-gray-200">
              <span>{post.user.name}</span>
              {post.user.verified && <BadgeCheckIcon className="ml-1 mt-1 h-4 w-4 text-primary" />}
            </a>
          </Link>
          <Link href={`/post/${post.id}`}>
            <a className="text-xs text-slate-700 hover:underline dark:text-gray-600">
              {formatDistanceToNowStrict(new Date(post.createdAt), { locale: dateLocal, addSuffix: true })}
            </a>
          </Link>
        </div>
      </div>

      <PostCardMenu onShareClick={onShareClick} />
    </div>
  );
};

export default PostCardTitle;
