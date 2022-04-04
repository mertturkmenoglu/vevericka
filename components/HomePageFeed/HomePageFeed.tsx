import { useEffect, useMemo } from 'react';
import PostCard from '../PostCard';
import { useTranslation } from 'next-i18next';
import { addResourceBundles } from '../../utils/addResourceBundles';
import translations from './HomePageFeed.i18n';
import constants from './HomePageFeed.constants';
import { PaginatedResults } from '../../service/common/PaginatedResult';
import { FeedPost } from '../../service/common/models/FeedPost';
import Spinner from '../../atom/Spinner/Spinner';

export interface HomePageFeedProps {
  feed: FeedPost[];
  onLoadMore: () => Promise<void>;
  isFetching: boolean;
}

const HomePageFeed: React.FC<HomePageFeedProps> = ({ feed, onLoadMore, isFetching }) => {
  const { t, i18n } = useTranslation(constants.I18N_NS);
  addResourceBundles(i18n, constants.I18N_NS, translations);

  const isFeedEmpty = useMemo(() => {
    return feed.length === 0;
  }, [feed]);

  useEffect(() => {
    const scrollListener = (e: Event) => {
      const loadMoreElement = document.querySelector<HTMLElement>('#home-feed-load-more');

      if (!loadMoreElement) {
        return;
      }

      const rect = loadMoreElement.getBoundingClientRect();

      const isInViewport =
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth);

      if (isInViewport && !isFetching) {
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
        <div className="text-xl font-semibold text-midnight dark:text-white">{t('feedEmpty')}</div>
      </div>
    );
  }

  return (
    <>
      <div className="mt-4 space-y-2 divide-y-2 dark:divide-y-0">
        {feed.map((post) => (
          <PostCard post={post} key={post.id} />
        ))}
        {isFetching && (
          <div className="flex justify-center">
            <Spinner appearance="accent" spacing="medium" />
          </div>
        )}
        <div id="home-feed-load-more" className="invisible"></div>
      </div>
    </>
  );
};

export default HomePageFeed;
