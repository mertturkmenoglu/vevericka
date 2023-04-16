import { ArrowDownIcon, ArrowUpIcon, ArrowUpTrayIcon, ChatBubbleBottomCenterIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { FragmentType, useFragment } from '../../generated';
import { postFragmentDocument, userFragmentDocument } from '../../graphql';
import { countFragmentDocument } from '../../graphql/fragments/countFragment';
import { getPostContent } from '../../lib';
import { LazyImage } from '../LazyImage';
import MoreMenu from './MoreMenu';
import ActionButton from './ActionButton';
import { differenceInMonths, format, formatDistanceToNowStrict } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { useMemo, useState } from 'react';

import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

export interface PostCardProps {
  post: FragmentType<typeof postFragmentDocument>;
}

function PostCard(props: PostCardProps): JSX.Element {
  const post = useFragment(postFragmentDocument, props.post);
  const user = useFragment(userFragmentDocument, post.user);
  const count = useFragment(countFragmentDocument, post._count);

  const [open, setOpen] = useState(false);

  const formattedDate = useMemo(() => {
    const currentDate = new Date();
    const postDate = new Date(post.createdAt);

    if (differenceInMonths(currentDate, postDate) > 1) {
      const formatString = differenceInMonths(currentDate, postDate) > 12 ? 'MMM d, yyyy' : 'MMM d';
      return format(postDate, formatString);
    }

    return formatDistanceToNowStrict(new Date(post.createdAt), { locale: enUS, addSuffix: true });
  }, [post.createdAt]);

  return (
    <article
      className="flex items-start space-x-2"
      style={{
        fontFamily: 'Roboto, sans-serif',
      }}
    >
      <Link
        to={`/u/${user.id}`}
        className="w-1/12"
      >
        <LazyImage
          src={user.image}
          alt="User image"
          placeholderSrc="/user.jpg"
          placeholderAlt="Loading"
          className="min-h-10 min-w-10 aspect-square h-10 w-10 rounded-full"
        />
      </Link>

      <div className="w-10/12">
        <div className="flex items-baseline space-x-1">
          <Link
            to={`/u/${user.id}`}
            className="text-sm font-semibold tracking-wide text-midnight hover:underline"
          >
            {user.name}
          </Link>
          <Link
            to={`/p/${post.id}`}
            className="text-xs tracking-tighter text-neutral-600 hover:underline"
          >
            {formattedDate}
          </Link>
        </div>

        <div className="text-xs font-light tracking-tighter sm:text-base sm:tracking-normal">
          {getPostContent(post.content)}
        </div>

        {post.images.length > 0 && (
          <div
            className={clsx('my-4 grid gap-2', {
              'mx-auto grid-cols-1': post.images.length === 1,
              'grid-cols-2': post.images.length === 2 || post.images.length === 4,
              'grid-cols-3': post.images.length === 3,
            })}
          >
            {post.images.map((image) => (
              <button
                key={image.id}
                onClick={() => setOpen(true)}
              >
                <LazyImage
                  src={image.url}
                  alt="User image"
                  placeholderSrc="/user.jpg"
                  placeholderAlt="Loading"
                  className={clsx('h-full w-full rounded-md object-cover', {
                    'aspect-square': post.images.length !== 1,
                    'aspect-video': post.images.length === 1,
                  })}
                />
              </button>
            ))}
          </div>
        )}

        <Lightbox
          open={open}
          close={() => setOpen(false)}
          slides={post.images.map((img) => ({ src: img.url }))}
          styles={{
            container: {
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
            },
          }}
        />

        <div className="-ml-2 mt-1 flex items-center justify-between">
          <ActionButton
            icon={ArrowUpIcon}
            text={count.likes}
            state="active"
          />

          <ActionButton
            icon={ArrowDownIcon}
            text={count.dislikes}
          />

          <ActionButton
            icon={ChatBubbleBottomCenterIcon}
            text={count.comments}
          />

          <ActionButton
            icon={ArrowUpTrayIcon}
            text={count.comments}
          />
        </div>
      </div>

      <div className="w-1/12">
        <MoreMenu />
      </div>
    </article>
  );
}

export default PostCard;
