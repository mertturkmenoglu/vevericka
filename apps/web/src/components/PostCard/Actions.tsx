import { useApolloClient, useMutation } from '@apollo/client';
import { ArrowDownIcon, ArrowUpIcon, ArrowUpTrayIcon, ChatBubbleBottomCenterIcon } from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import { CountItemFragment, PostItemFragment } from '../../generated/graphql';
import { votePostDocument } from '../../graphql';
import { copyToClipboard } from '../../lib';
import ActionButton from './ActionButton';

export interface ActionsProps {
  post: PostItemFragment;
  count: CountItemFragment;
}

function Actions({ post, count }: ActionsProps): JSX.Element {
  const [vote] = useMutation(votePostDocument);
  const client = useApolloClient();

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
  );
}

export default Actions;
