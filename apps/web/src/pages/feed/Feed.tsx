import { AppBar, PostCard, Stories, ExploreCard, Footer } from '../../components';

function Feed(): JSX.Element {
  return (
    <main className="container mx-auto">
      <AppBar className="sm:mt-4" />
      <div className="mx-32 mt-8 flex items-start justify-between">
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
      </div>
    </main>
  );
}

export default Feed;
