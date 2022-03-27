import { useMemo } from 'react';
import { IPost } from '../../service/models/IPost';
import PostCard from '../PostCard';
import { useTranslation } from 'next-i18next';
import { addResourceBundles } from '../../utils/addResourceBundles';
import translations from './HomePageFeed.i18n';
import constants from './HomePageFeed.constants';

export interface HomePageFeedProps {
  feed: IPost[];
}

const HomePageFeed: React.FC<HomePageFeedProps> = ({ feed }) => {
  const { t, i18n } = useTranslation(constants.I18N_NS);
  addResourceBundles(i18n, constants.I18N_NS, translations);

  const isFeedEmpty = useMemo(() => {
    return feed.length === 0;
  }, [feed]);

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
      </div>
    </>
  );
};

export default HomePageFeed;
