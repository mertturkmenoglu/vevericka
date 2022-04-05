import { FeedPost } from '../../service/common/models/FeedPost';
import clsx from 'clsx';
import PostCardTitle from './PostCardTitle';
import PostCardContent from './PostCardContent';
import PostCardActions from './PostCardActions';

export interface PostCardProps {
  post: FeedPost;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <article key={post.id} className={clsx('flex flex-col', 'bg-white dark:bg-neutral-800', 'w-full', 'py-4 px-2')}>
      <PostCardTitle post={post} />

      <PostCardContent post={post} />

      <PostCardActions post={post} />
    </article>
  );
};

export default PostCard;
