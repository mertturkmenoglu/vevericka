import { PostCard, Stories, ExploreCard, Footer } from '../../components';
import { MainLayout } from '../../layouts';

function Feed(): JSX.Element {
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
