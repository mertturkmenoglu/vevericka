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

  console.log(data);

  return (
    <MainLayout>
      <div className="w-1/2 space-y-8">
        <Stories />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
        <PostCard />
      </div>
      <aside className="sticky top-8 flex w-1/2 flex-col items-end">
        <ExploreCard className="w-3/4" />
        <Footer className="w-3/4" />
      </aside>
    </MainLayout>
  );
}

export default Feed;
