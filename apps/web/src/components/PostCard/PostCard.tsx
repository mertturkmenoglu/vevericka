import { ArrowDownIcon, ArrowUpIcon, ChatBubbleBottomCenterIcon, ShareIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { FragmentType, useFragment } from '../../generated';
import { postFragmentDocument, userFragmentDocument } from '../../graphql';
import { countFragmentDocument } from '../../graphql/fragments/countFragment';
import { getPostContent } from '../../lib';
import { LazyImage } from '../LazyImage';
import MoreMenu from './MoreMenu';

const images = [
  'https://fastly.picsum.photos/id/676/200/200.jpg?hmac=hgeMQEIK4Mn27Q2oLRWjXo1rgxwTbk1CnJE954h_HyM',
  'https://fastly.picsum.photos/id/822/2000/2000.jpg?hmac=Biy6RuHUnRpLPDvrJEKXHcNwp3SFb8opiBBQRx5WWRc',
  'https://fastly.picsum.photos/id/883/2000/2000.jpg?hmac=95xD0COVnXluo3kG8Rx0BQy4UojFiOPJ2hoanxJtWlM',
  'https://fastly.picsum.photos/id/74/1000/1000.jpg?hmac=qyw_GbDDT5ax1EE8yALr-sc0E7PyJyLByU4xUdyfRHA',
];

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
        <div className="flex items-baseline space-x-2">
          <Link
            to={`/u/${user.id}`}
            className="font-medium text-midnight hover:underline"
          >
            {user.name}
          </Link>
          <Link
            to={`/p/${post.id}`}
            className="text-xs text-neutral-600 hover:underline"
          >
            2h
          </Link>
        </div>

        <p className="text-sm font-normal tracking-tighter sm:text-base sm:tracking-normal">
          {getPostContent(post.content)}
        </p>

        {post.images.length > 0 && (
          <div
            className={clsx('my-4 grid gap-2', {
              'mx-auto grid-cols-1': images.length === 1,
              'grid-cols-2': images.length === 2 || images.length === 4,
              'grid-cols-3': images.length === 3,
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
                    'aspect-square': images.length !== 1,
                    'aspect-video': images.length === 1,
                  })}
                />
              </button>
            ))}
          </div>
        )}

        <div className=" flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <button className="flex items-center space-x-1 rounded-md py-1 pr-2 text-berry hover:bg-midnight/10">
              <ArrowUpIcon className="h-5 w-5" />
              <span className="text-sm">{count.likes}</span>
            </button>
            <button className="flex items-center space-x-1 rounded-md py-1 px-2 hover:bg-midnight/10">
              <ArrowDownIcon className="h-5 w-5 text-midnight" />
              <span className="text-sm text-midnight">{count.dislikes}</span>
            </button>

            <button className="flex items-center space-x-1 rounded-md py-1 px-2 hover:bg-midnight/10">
              <ChatBubbleBottomCenterIcon className="h-5 w-5 text-midnight" />
              <span className="text-sm text-midnight">{count.comments}</span>
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 rounded-md py-1 px-2 hover:bg-midnight/10">
              <ShareIcon className="h-5 w-5 text-midnight" />
              <span className="text-sm text-midnight">Share</span>
            </button>

            <MoreMenu />
          </div>
        </div>
      </div>
    </article>
  );
}

export default PostCard;
