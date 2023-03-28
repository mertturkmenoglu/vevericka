import { useQuery } from '@apollo/client';
import { PostCard, Stories, ExploreCard, Footer } from '../../components';
import { feedQueryDocument } from '../../graphql';
import { MainLayout } from '../../layouts';

function Feed(): JSX.Element {
  const { data } = useQuery(feedQueryDocument, {
    variables: {
      skip: 0,
      take: 10,
    },
  });

  if (!data) return <div>Loading...</div>;

  return (
    <MainLayout>
      <div className="w-1/2 space-y-8">
        <Stories />
        {data.feed.posts.map((post, index) => (
          <PostCard
            key={index}
            post={post}
          />
        ))}
      </div>
      <aside className="sticky top-8 flex w-1/2 flex-col items-end">
        <ExploreCard className="w-3/4" />
        <Footer className="w-3/4" />
      </aside>
    </MainLayout>
  );
}

export default Feed;
