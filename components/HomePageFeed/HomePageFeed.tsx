import { useEffect, useMemo } from 'react';
import PostCard from '@components/PostCard';
import { useTranslation } from 'next-i18next';
import { addResourceBundles, isElementInViewport } from '@utils/index';
import { FeedPost } from '@service/common/models/FeedPost';
import Spinner from '@atom/Spinner/Spinner';
import { translations } from './HomePageFeed.i18n';
import constants from './HomePageFeed.constants';

export interface HomePageFeedProps {
  feed: FeedPost[];
  onLoadMore: () => Promise<void>;
  isFetching: boolean;
}

const HomePageFeed: React.FC<HomePageFeedProps> = ({ feed, onLoadMore, isFetching }) => {
  const { t, i18n } = useTranslation(constants.I18N_NS);
  addResourceBundles(i18n, constants.I18N_NS, translations);
  const isFeedEmpty = useMemo(() => feed.length === 0, [feed]);

  useEffect(() => {
    const scrollListener = () => {
      const loadMoreElement = document.querySelector<HTMLElement>('#home-feed-load-more');

      if (!loadMoreElement) {
        return;
      }

      if (isElementInViewport(loadMoreElement) && !isFetching) {
        onLoadMore();
      }
    };

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  }, [onLoadMore, isFetching]);

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
        <PostCard post={post} key={post.id} />
      ))}
      {isFetching && (
        <div className="mt-4 flex justify-center">
          <Spinner appearance="accent" spacing="medium" />
        </div>
      )}
      <div id="home-feed-load-more" className="invisible" />
    </div>
  );
};

export default HomePageFeed;
