import { FeedPost } from '@services/index';
import clsx from 'clsx';
import Actions from './Actions';
import Title from './Title';
import Content from './Content';

export interface PostCardProps {
  post: FeedPost;
}

function PostCard({ post }: PostCardProps): JSX.Element {
  return (
    <article
      key={post.id}
      className={clsx(
        'flex flex-col',
        'bg-white dark:bg-neutral-800',
        'w-full',
        'px-2 pt-2',
        'dark:rounded-md',
        'dark:pb-2'
      )}
    >
      <Title post={post} />

      <Content post={post} />

      <Actions post={post} />
    </article>
  );
}

export default PostCard;
