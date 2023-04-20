import { ArrowDownIcon, ArrowUpIcon, ArrowUpTrayIcon, ChatBubbleBottomCenterIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { FragmentType, useFragment } from '../../generated';
import { postFragmentDocument, userFragmentDocument, votePostDocument } from '../../graphql';
import { countFragmentDocument } from '../../graphql/fragments/countFragment';
import { LazyImage } from '../LazyImage';
import MoreMenu from './MoreMenu';
import ActionButton from './ActionButton';

import { useState } from 'react';

import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import PostContent from './PostContent';
import { useApolloClient, useMutation } from '@apollo/client';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormattedDate } from './useFormattedDate';
import { useGridRoundStyles } from './useGridRoundStyles';

export interface PostCardProps {
  post: FragmentType<typeof postFragmentDocument>;
}

function PostCard(props: PostCardProps): JSX.Element {
  const post = useFragment(postFragmentDocument, props.post);
  const user = useFragment(userFragmentDocument, post.user);
  const count = useFragment(countFragmentDocument, post._count);

  const [open, setOpen] = useState(false);
  const [vote] = useMutation(votePostDocument);
  const client = useApolloClient();

  const formattedDate = useFormattedDate(post.createdAt);

  const hasMedia = post.images.length > 0 || post.videos.length > 0;

  const onVote = async (value: string) => {
    const oldVote = post.vote;
    let newVote = 'none';

    if (value === 'like') {
      newVote = post.vote === 'like' ? 'none' : 'like';
    } else {
      newVote = post.vote === 'dislike' ? 'none' : 'dislike';
    }

    client.cache.modify({
      id: post.id,
      fields: {
        vote: () => newVote,
      },
    });

    const res = await vote({
      variables: {
        id: post.id,
        vote: newVote,
      },
    });

    if (res.errors) {
      toast('Something went wrong', { type: 'error', autoClose: 3000 });
    } else {
      client.cache.modify({
        id: post.id,
        fields: {
          vote: () => oldVote,
        },
      });
    }
  };

  const roundedStyles = useGridRoundStyles();

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
          <PostContent
            text={post.content}
            hasMedia={hasMedia}
          />
        </div>

        {post.images.length > 0 && (
          <div
            className={clsx('my-4 grid gap-[1px]', {
              'mx-auto grid-cols-1': post.images.length === 1,
              'grid-cols-2': post.images.length === 2 || post.images.length === 4,
              'grid-cols-3': post.images.length === 3,
            })}
          >
            {post.images.map((image, index) => (
              <button
                key={image.id}
                onClick={() => setOpen(true)}
              >
                <LazyImage
                  src={image.url}
                  alt="User image"
                  placeholderSrc="/user.jpg"
                  placeholderAlt="Loading"
                  className={clsx(
                    'h-full w-full object-cover',
                    {
                      'aspect-square': post.images.length !== 1,
                      'aspect-auto': post.images.length === 1,
                    },
                    roundedStyles(post.images.length, index)
                  )}
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
            state={post.vote === 'like' ? 'active' : 'inactive'}
            onClick={async () => onVote('like')}
          />

          <ActionButton
            icon={ArrowDownIcon}
            text={count.dislikes}
            state={post.vote === 'dislike' ? 'active' : 'inactive'}
            onClick={async () => onVote('dislike')}
          />

          <ActionButton
            icon={ChatBubbleBottomCenterIcon}
            text={count.comments}
          />

          <ActionButton
            icon={ArrowUpTrayIcon}
            text={''}
          />
        </div>
      </div>

      <div className="w-1/12">
        <MoreMenu />
      </div>

      <ToastContainer />
    </article>
  );
}

export default PostCard;
