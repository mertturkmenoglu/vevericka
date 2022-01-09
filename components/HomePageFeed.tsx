import { useMemo } from 'react';
import { IPost } from '../api/models/IPost';
import PostCard from './PostCard';

export interface HomePageFeedProps {
  feed: IPost[];
}

const HomePageFeed: React.FC<HomePageFeedProps> = ({ feed }) => {
  const isFeedEmpty = useMemo(() => {
    return feed.length === 0;
  }, [feed]);

  if (isFeedEmpty) {
    return (
      <div className="flex justify-center mt-16">
        <div className="text-deep-orange text-xl font-semibold">
          We couldn't find any results.
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="divide-y-2 space-y-2 mt-4 dark:divide-y-0">
        {feed.map((post) => (
          <div key={post.id}>
            <PostCard post={post} />
          </div>
        ))}
      </div>
    </>
  );
};

export default HomePageFeed;
