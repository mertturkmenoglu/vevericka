import { IUser } from './IUser';

export interface IPost {
  id: number;

  content: string;

  createdAt: string;

  updatedAt: string;

  tags: any[];

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
  likeStatus: 'NONE' | 'LIKED' | 'DISLIKED';
}
