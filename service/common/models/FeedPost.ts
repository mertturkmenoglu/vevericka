import { Post } from './Post';

export type FeedPost = Post & {
  user: {
    id: number;
    username: string;
    name: string;
    image: string;
    verified: boolean;
    protected: boolean;
  };
  _count: {
    likes: number;
    dislikes: number;
    comments: number;
    tags: number;
  };
};
