import { Tag } from './Tag';

export type TagWithCount = Tag & {
  _count: {
    posts: number;
  };
};
