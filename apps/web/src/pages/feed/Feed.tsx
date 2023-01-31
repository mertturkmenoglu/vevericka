import { AppBar, PostCard, Stories } from '../../components';

function Feed(): JSX.Element {
  return (
    <main className="container mx-auto">
      <AppBar className="sm:mt-4" />
      <div className="mt-16 ml-32 max-w-[640px] space-y-8">
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
    </main>
  );
}

export default Feed;
