import React, { useMemo } from 'react';
import { FeedPost } from '../../service/common/models/FeedPost';
import { preparePostText } from '../../utils/Post.utils';

export interface PostCardContentProps {
  post: FeedPost;
}

const PostCardContent: React.FC<PostCardContentProps> = ({ post }) => {
  const gridClass = useMemo(() => {
    return post.images.length === 1 ? 'grid grid-cols-1' : 'grid grid-cols-2';
  }, [post]);

  return (
    <>
      <p
        className="mt-4 break-words text-slate-700 dark:text-gray-400"
        dangerouslySetInnerHTML={{ __html: preparePostText(post.content) }}
      />

      {post.images.length > 0 && (
        <div className={`mx-auto mt-8 grid ${gridClass} place-items-center gap-4`}>
          {post.images.map((image, index) => (
            <img src={image.url} alt="" key={index} className="aspect-video max-h-[256px] rounded-md object-cover" />
          ))}
        </div>
      )}
    </>
  );
};

export default PostCardContent;
