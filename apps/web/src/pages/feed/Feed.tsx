import { useQuery } from '@apollo/client';
import { PostCard, Stories, ExploreCard, Footer } from '../../components';
import { feedQueryDocument } from '../../graphql';
import { LoadingLayout, MainLayout } from '../../layouts';
import { useFlags } from '../../hooks';

function Feed(): JSX.Element {
  const flags = useFlags();
  const { data, error, loading } = useQuery(feedQueryDocument, {
    variables: {
      skip: 0,
      take: 10,
    },
  });

  return (
    <MainLayout>
      <div className="w-1/2 space-y-8">
        {flags.stories && <Stories />}
        <LoadingLayout
          data={data}
          loading={loading}
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
