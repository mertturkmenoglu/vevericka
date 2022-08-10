import { FeedPost, LikeStatus, PostApi } from '@services/index';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useQueryClient } from 'react-query';

export function useLike(post: FeedPost) {
  const { data: session, status: authStatus } = useSession();
  const [postApi, setPostApi] = useState<PostApi | null>(null);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (authStatus !== 'authenticated' || !session) {
      return;
    }

    setPostApi(new PostApi(session.jwt));
  }, [session, authStatus, setPostApi]);

  const like = async () => {
    if (!postApi) {
      return;
    }

    if (post.likeStatus === LikeStatus.LIKED) {
      await postApi.likeNone(post.id);
    } else {
      await postApi.likePost(post.id);
    }

    queryClient.invalidateQueries('feed');
    queryClient.refetchQueries('feed');
  };

  const dislike = async () => {
    if (!postApi) {
      return;
    }

    if (post.likeStatus === LikeStatus.DISLIKED) {
      await postApi.likeNone(post.id);
    } else {
      await postApi.dislikePost(post.id);
    }

    queryClient.invalidateQueries('feed');
    queryClient.refetchQueries('feed');
  };

  return {
    like,
    dislike,
  };
}
