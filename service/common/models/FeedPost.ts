import { LikeStatus } from './LikeStatus';
import { MinimalUserResponse } from './MinimalUserResponse';
import { Post } from './Post';

export type FeedPost = Post & {
  user: MinimalUserResponse;
  likeStatus: LikeStatus;
  _count: {
    likes: number;
    dislikes: number;
    comments: number;
    tags: number;
  };
};
