import { MainLayout } from '../../layouts';

function Bookmarks(): JSX.Element {
  return (
    <MainLayout>
      <div className="mt-8">
        <h2 className="text-2xl font-medium">Bookmarks</h2>
        <hr className="h-[1px] max-w-md border border-midnight bg-midnight" />
        <div className="mt-4">You don't have any bookmarks</div>
      </div>
    </MainLayout>
  );
}

export default Bookmarks;
