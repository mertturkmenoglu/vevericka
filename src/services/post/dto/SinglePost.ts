import { LikeStatus, Post, Tag } from '.';

export type SinglePost = Post & {
  tags: Tag[];
  user: {
    id: number;
    username: string;
    name: string;
    image: string;
    verified: boolean;
    protected: boolean;
  };
  tagsCount: number;
  commentsCount: number;
  dislikesCount: number;
  likesCount: number;
  likeStatus: LikeStatus;
};
