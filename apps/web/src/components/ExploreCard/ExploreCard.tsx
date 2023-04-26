import { useQuery } from '@apollo/client';
import clsx from 'clsx';
import { popularTagsQueryDocument } from '../../graphql/queries/popularTagsQuery';
import { Spinner } from '../Spinner';
import Item from './Item';
import More from './More';

interface Props {
  className?: string;
}

function ExploreCard({ className }: Props): JSX.Element {
  const { data, loading, error } = useQuery(popularTagsQueryDocument, {
    variables: {
      skip: 0,
      take: 10,
    },
    pollInterval: 1000 * 60 * 5, // Refetch every 5 minutes
  });

  return (
    <div className={clsx('rounded bg-neutral-100 py-4 dark:bg-neutral-800', className)}>
      <h2 className="px-6 text-xl font-normal text-midnight dark:text-white">Explore Vevericka</h2>

      <hr className="mx-6 mt-1 rounded border border-midnight/10 dark:border-neutral-600" />

      {error && <p className="mx-auto my-8 text-center text-midnight dark:text-white">Something went wrong</p>}
      {loading && (
        <div className="mx-auto my-8 flex w-full items-center justify-center">
          <Spinner />
        </div>
      )}
      {data && (
        <div className="mt-2 space-y-2">
          {data.popularTags.map((item) => (
            <Item
              item={item}
              key={item.id}
            />
          ))}
        </div>
      )}

      <hr className="mx-6 mt-2 rounded border border-midnight/10 dark:border-neutral-600" />

      <More />
    </div>
  );
}

export default ExploreCard;
