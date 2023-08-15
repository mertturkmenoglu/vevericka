import React, { useId } from 'react';
import { Helmet } from 'react-helmet';
import { ExploreCard, Footer, PostCard } from '../../components';
// import { useFlags } from '../../hooks';
import { LoadingLayout, MainLayout } from '../../layouts';
import { useFeed } from './useFeed';

// const Stories = React.lazy(() => import('../../components/Stories/Stories'));

function Feed(): JSX.Element {
  const loadMoreId = useId();
  // const flags = useFlags();
  const { data, loading, error } = useFeed(loadMoreId);

  return (
    <MainLayout>
      <div className="w-full space-y-4 lg:w-1/2">
        <Helmet>
          <title>Feed | Vevericka</title>
        </Helmet>
        {/*{flags.stories && (*/}
        {/*  <Suspense fallback={<Loading />}>*/}
        {/*    <Stories />*/}
        {/*  </Suspense>*/}
        {/*)}*/}
        <LoadingLayout
          data={data}
          loading={loading && !data}
          error={error}
        >
          <div className="divide-y-2 divide-neutral-100 dark:divide-neutral-900 [&>*]:py-2">
            {data &&
              data.feed.posts.map((post, index) => (
                <PostCard
                  key={index}
                  post={post}
                />
              ))}
          </div>
          <div id={loadMoreId} />
        </LoadingLayout>
      </div>
      <aside className="sticky top-20 hidden w-1/2 flex-col items-end lg:flex">
        <ExploreCard className="w-3/4" />
        <Footer className="w-3/4" />
      </aside>
    </MainLayout>
  );
}

export default Feed;
