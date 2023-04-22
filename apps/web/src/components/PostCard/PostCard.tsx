import { useApolloClient, useMutation } from '@apollo/client';
import { ArrowDownIcon, ArrowUpIcon, ArrowUpTrayIcon, ChatBubbleBottomCenterIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FragmentType, useFragment } from '../../generated';
import { countFragmentDocument, postFragmentDocument, userFragmentDocument, votePostDocument } from '../../graphql';
import { copyToClipboard } from '../../lib';
import { LazyImage } from '../LazyImage';
import ActionButton from './ActionButton';
import { useFormattedDate } from './hooks';
import MoreMenu from './MoreMenu';
import PostContent from './PostContent';
import PostImages from './PostImages';

export interface PostCardProps {
  post: FragmentType<typeof postFragmentDocument>;
}

function PostCard(props: PostCardProps): JSX.Element {
  const post = useFragment(postFragmentDocument, props.post);
  const user = useFragment(userFragmentDocument, post.user);
  const count = useFragment(countFragmentDocument, post._count);

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

        <PostImages images={post.images} />

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
            onClick={() => {
              const url = window.location.origin + `/p/${post.id}`;
              copyToClipboard(url);
              toast('Copied to clipboard', { type: 'success', autoClose: 3000 });
            }}
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
