import { FeedPost, LikeStatus, PostApi } from '@services/post';
import { useRef } from 'react';
import { useQueryClient } from 'react-query';

export function useLike(post: FeedPost) {
  const postApi = useRef(new PostApi()).current;
  const queryClient = useQueryClient();

  const like = async () => {
    if (post.likeStatus === LikeStatus.LIKED) {
      await postApi.likeNone(post.id);
    } else {
      await postApi.likePost(post.id);
    }

    await queryClient.invalidateQueries('feed');
    await queryClient.refetchQueries('feed');
  };

  const dislike = async () => {
    if (post.likeStatus === LikeStatus.DISLIKED) {
      await postApi.likeNone(post.id);
    } else {
      await postApi.dislikePost(post.id);
    }

    await queryClient.invalidateQueries('feed');
    await queryClient.refetchQueries('feed');
  };

  return {
    like,
    dislike,
  };
}
