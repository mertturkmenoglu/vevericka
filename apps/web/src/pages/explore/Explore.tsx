import { useQuery } from '@apollo/client';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { popularTagsQueryDocument } from '../../graphql/queries/popularTagsQuery';
import { LoadingLayout, MainLayout } from '../../layouts';

const formatCount = (count: number) => {
  return Intl.NumberFormat('en-US', { notation: 'compact' }).format(count);
};

const formatTag = (tag: string) => {
  const LIMIT = 16;
  const withoutSymbol = tag.substring(1);
  if (withoutSymbol.length <= LIMIT) {
    return withoutSymbol;
  }

  return withoutSymbol.substring(0, LIMIT) + '...';
};

const styles = [
  'text-white bg-gradient-to-r from-indigo-800 to-indigo-500',
  'text-white bg-gradient-to-r from-pink-800 to-pink-500',
  'text-white bg-gradient-to-r from-purple-800 to-purple-500',
  'text-white bg-gradient-to-r from-red-800 to-red-500',
  'text-white bg-gradient-to-r from-teal-800 to-teal-500',
  'text-white bg-gradient-to-r from-emerald-800 to-emerald-500',
  'text-white bg-gradient-to-r from-blue-800 to-blue-500',
  'text-white bg-gradient-to-r from-green-800 to-green-500',
  'text-white bg-gradient-to-r from-lime-800 to-lime-500',
  'text-white bg-gradient-to-r from-gray-800 to-gray-500',
];

function Explore(): JSX.Element {
  const { data, error, loading } = useQuery(popularTagsQueryDocument, {
    variables: {
      skip: 0,
      take: 10,
    },
  });

  return (
    <MainLayout>
      <div className="mt-8 w-full">
        <Helmet>
          <title>Explore | Vevericka</title>
        </Helmet>
        <h2 className="text-2xl font-medium">Explore</h2>
        <hr className="h-[1px] max-w-md border border-midnight bg-midnight" />
        <LoadingLayout
          data={data}
          error={error}
          loading={loading}
        >
          {data && (
            <>
              <div className="mt-4 text-lg font-bold">Tags</div>
              <div className="mt-4 grid w-full grid-cols-5 gap-4">
                {data.popularTags.map((it, index) => (
                  <Link
                    to={`/explore/${it.tagName.substring(1)}`}
                    key={it.id}
                    className="group rounded"
                  >
                    <div
                      className={clsx(
                        'flex aspect-video w-full items-center rounded-t bg-amber-200 pl-4 text-lg font-bold',
                        styles[index]
                      )}
                    >
                      {formatTag(it.tagName)}
                    </div>

                    <div className="rounded-b bg-neutral-100 p-2 text-midnight">
                      <p className="bg-neutral-100 text-xs text-midnight">{formatCount(it._count.posts)} posts</p>
                      <div className="flex items-center space-x-2">
                        <p className="text-base font-medium text-midnight">See More</p>
                        <ArrowRightIcon className="h-5 w-5 text-midnight opacity-0 transition duration-200 ease-in-out group-hover:opacity-100" />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </LoadingLayout>
      </div>
    </MainLayout>
  );
}

export default Explore;
