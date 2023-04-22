import { Link } from 'react-router-dom';
import { FragmentType, useFragment } from '../../generated';
import { countFragmentDocument, postFragmentDocument, userFragmentDocument } from '../../graphql';
import { LazyImage } from '../LazyImage';
import Actions from './Actions';
import MoreMenu from './MoreMenu';
import PostContent from './PostContent';
import PostImages from './PostImages';
import Title from './Title';

export interface PostCardProps {
  post: FragmentType<typeof postFragmentDocument>;
}

function PostCard(props: PostCardProps): JSX.Element {
  const post = useFragment(postFragmentDocument, props.post);
  const user = useFragment(userFragmentDocument, post.user);
  const count = useFragment(countFragmentDocument, post._count);
  const hasMedia = post.images.length > 0 || post.videos.length > 0;

  return (
    <article
      className="flex items-start space-x-2"
      style={{
        fontFamily: 'Roboto, sans-serif',
      }}
    >
      <Link
        to={`/u/${user.id}`}
        className="w-1/12"
      >
        <LazyImage
          src={user.image}
          alt="User image"
          placeholderSrc="/user.jpg"
          placeholderAlt="Loading"
          className="min-h-10 min-w-10 aspect-square h-10 w-10 rounded-full"
        />
      </Link>

      <div className="w-10/12">
        <Title
          userId={user.id}
          name={user.name}
          postId={post.id}
          createdAt={post.createdAt}
        />

        <div className="text-xs font-light tracking-tighter sm:text-base sm:tracking-normal">
          <PostContent
            text={post.content}
            hasMedia={hasMedia}
          />
        </div>

        <PostImages images={post.images} />

        <Actions
          post={post}
          count={count}
        />
      </div>

      <div className="w-1/12">
        <MoreMenu />
      </div>
    </article>
  );
}

export default PostCard;
