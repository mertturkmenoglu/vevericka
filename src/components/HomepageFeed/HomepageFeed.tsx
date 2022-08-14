import { useMemo } from 'react';
import Spinner from 'src/atom/Spinner/Spinner';
import useTranslation from 'next-translate/useTranslation';
import { FeedPost } from '@services/index';

import { PostCard } from '@components/PostCard';
import { useLoadMore } from './useLoadMore.hook';

export interface HomePageFeedProps {
  feed: FeedPost[];
  onLoadMore: () => Promise<void>;
  isFetching: boolean;
}

const HomePageFeed: React.FC<HomePageFeedProps> = ({ feed, onLoadMore, isFetching }) => {
  const { t } = useTranslation('feed');
  const isFeedEmpty = useMemo(() => feed.length === 0, [feed]);

  useLoadMore(isFetching, onLoadMore);

  if (isFeedEmpty) {
    return (
      <div className="mt-16 flex justify-center">
        <p className="text-xl font-semibold text-midnight dark:text-white">{t('feedEmpty')}</p>
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-2 divide-y-2 dark:divide-y-0">
      {feed.map((post) => (
        <PostCard
          post={post}
          key={post.id}
        />
      ))}
      {isFetching && (
        <div className="mt-4 flex justify-center">
          <Spinner
            appearance="accent"
            spacing="medium"
          />
        </div>
      )}
      <div
        id="home-feed-load-more"
        className="invisible"
      />
    </div>
  );
};

export default HomePageFeed;
