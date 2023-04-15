import { ArrowDownIcon, ArrowUpIcon, ChatBubbleBottomCenterIcon, ShareIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { FragmentType, useFragment } from '../../generated';
import { postFragmentDocument, userFragmentDocument } from '../../graphql';
import { countFragmentDocument } from '../../graphql/fragments/countFragment';
import { getPostContent } from '../../lib';
import { LazyImage } from '../LazyImage';
import MoreMenu from './MoreMenu';
import ActionButton from './ActionButton';

export interface PostCardProps {
  post: FragmentType<typeof postFragmentDocument>;
}

function PostCard(props: PostCardProps): JSX.Element {
  const post = useFragment(postFragmentDocument, props.post);
  const user = useFragment(userFragmentDocument, post.user);
  const count = useFragment(countFragmentDocument, post._count);

  return (
    <article className="flex items-start space-x-2">
      <Link
        to={`/u/${user.id}`}
        className="w-1/12"
      >
        <LazyImage
          src={user.image}
          alt="User image"
          placeholderSrc="/user.jpg"
          placeholderAlt="Loading"
          className="min-h-10 min-w-10 aspect-square h-10 w-10 rounded-md"
        />
      </Link>

      <div className="w-11/12">
        <div className="flex items-baseline space-x-1">
          <Link
            to={`/u/${user.id}`}
            className="text-xl font-normal tracking-wide text-midnight hover:underline"
          >
            {user.name}
          </Link>
          <Link
            to={`/p/${post.id}`}
            className="text-xs tracking-tighter text-neutral-600 hover:underline"
          >
            2h
          </Link>
        </div>

        <div className="text-sm font-light tracking-tighter sm:text-base sm:tracking-normal">
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
              <button key={image.id}>
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

        <div className=" flex items-center justify-between">
          <div className="flex items-center space-x-6">
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
          </div>

          <div className="flex items-center space-x-4">
            <ActionButton
              icon={ShareIcon}
              text="Share"
            />

            <MoreMenu />
          </div>
        </div>
      </div>
    </article>
  );
}

export default PostCard;
