import { PostCard, Stories, ExploreCard, Footer } from '../../components';
import { LoadingLayout, MainLayout } from '../../layouts';
import { useFlags } from '../../hooks';
import { useId } from 'react';
import { useFeed } from './useFeed';
import { Helmet } from 'react-helmet';

function Feed(): JSX.Element {
  const loadMoreId = useId();
  const flags = useFlags();
  const { data, loading, error } = useFeed(loadMoreId);

  return (
    <MainLayout>
      <div className="w-1/2 space-y-8">
        <Helmet>
          <title>Feed | Vevericka</title>
        </Helmet>
        {flags.stories && <Stories />}
        <LoadingLayout
          data={data}
          loading={loading && !data}
          error={error}
        >
          <div className="divide-y-2 divide-neutral-100 [&>*]:py-2">
            {data &&
              data.feed.posts.map((post, index) => (
                <PostCard
                  key={index}
                  post={post}
                />
              ))}
            <div id={loadMoreId} />
          </div>
        </LoadingLayout>
      </div>
      <aside className="sticky top-8 flex w-1/2 flex-col items-end">
        <ExploreCard className="w-3/4" />
        <Footer className="w-3/4" />
      </aside>
    </MainLayout>
  );
}

export default Feed;
