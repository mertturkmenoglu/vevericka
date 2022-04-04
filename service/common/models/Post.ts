import { PostImage } from './PostImage';
import { PostVideo } from './PostVideo';

export type Post = {
  id: number;
  content: string;
  videos: PostVideo[];
  images: PostImage[];
  userId: number;
  createdAt: Date;
  updatedAt: Date;
};
