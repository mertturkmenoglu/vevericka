import { useApolloClient, useMutation } from '@apollo/client';
import { ArrowDownIcon, ArrowUpIcon, ArrowUpTrayIcon, ChatBubbleBottomCenterIcon } from '@heroicons/react/24/outline';
import { useState, useTransition } from 'react';
import { toast } from 'react-toastify';
import { CountItemFragment, PostItemFragment } from '../../generated/graphql';
import { votePostDocument } from '../../graphql';
import { useTheme } from '../../hooks';
import { copyToClipboard } from '../../lib';
import ActionButton from './ActionButton';

export interface ActionsProps {
  post: PostItemFragment;
  count: CountItemFragment;
}

function Actions({ post, count }: ActionsProps): JSX.Element {
  const [, startTransition] = useTransition();
  const [voteState, setVoteState] = useState(post.vote);
  const [likesState, setLikesState] = useState(count.likes);
  const [dislikesState, setDislikesState] = useState(count.dislikes);
  const [vote] = useMutation(votePostDocument);
  const client = useApolloClient();
  const [theme] = useTheme();

  const onVote = async (value: string) => {
    const oldVote = voteState;
    let newVote = 'none';

    if (value === 'like') {
      newVote = voteState === 'like' ? 'none' : 'like';
    } else {
      newVote = voteState === 'dislike' ? 'none' : 'dislike';
    }

    startTransition(() => {
      client.cache.modify({
        id: post.id,
        fields: {
          vote: () => newVote,
        },
      });

      setVoteState(newVote);

      if (newVote === 'like') {
        if (oldVote === 'dislike') {
          setDislikesState((prev) => prev - 1);
          setLikesState((prev) => prev + 1);
        }

        if (oldVote === 'none') {
          setLikesState((prev) => prev + 1);
        }

        if (oldVote === 'like') {
          setLikesState((prev) => prev - 1);
        }
      } else {
        if (oldVote === 'like') {
          setLikesState((prev) => prev - 1);
          setDislikesState((prev) => prev + 1);
        }

        if (oldVote === 'none') {
          setDislikesState((prev) => prev + 1);
        }

        if (oldVote === 'dislike') {
          setDislikesState((prev) => prev - 1);
        }
      }
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

    setVoteState(newVote);
  };

  return (
    <div className="-ml-2 mt-1 flex items-center justify-between">
      <ActionButton
        icon={ArrowUpIcon}
        text={likesState}
        state={voteState === 'like' ? 'active' : 'inactive'}
        onClick={async () => onVote('like')}
      />

      <ActionButton
        icon={ArrowDownIcon}
        text={dislikesState}
        state={voteState === 'dislike' ? 'active' : 'inactive'}
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
          toast('Copied link to clipboard', { type: 'success', autoClose: 3000, hideProgressBar: true, theme });
        }}
      />
    </div>
  );
}

export default Actions;
