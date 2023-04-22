import { Helmet } from 'react-helmet';
import { useLoaderData } from 'react-router-dom';
import { BookmarksQuery } from '../../generated/graphql';
import { MainLayout } from '../../layouts';
import Item from './Item';

function Bookmarks(): JSX.Element {
  const data = useLoaderData() as BookmarksQuery;

  return (
    <MainLayout>
      <div className="mt-8">
        <Helmet>
          <title>Bookmarks | Vevericka</title>
        </Helmet>
        <h2 className="text-2xl font-medium">Your Bookmarks</h2>
        <hr className="h-[1px] max-w-md border border-midnight bg-midnight" />
        <div className="mx-auto mt-16 w-1/2">
          {data.bookmarks.map((it) => (
            <Item
              key={it.id}
              id={it.id}
              post={it.post}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}

export default Bookmarks;
