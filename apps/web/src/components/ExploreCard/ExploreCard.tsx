import clsx from 'clsx';
import More from './More';
import Item from './Item';
import { useQuery } from '@apollo/client';
import { popularTagsQueryDocument } from '../../graphql/queries/popularTagsQuery';
import { Spinner } from '../Spinner';

interface Props {
  className?: string;
}

function ExploreCard({ className }: Props): JSX.Element {
  const { data, loading, error } = useQuery(popularTagsQueryDocument, {
    variables: {
      skip: 0,
      take: 10,
    },
  });

  return (
    <div className={clsx('rounded bg-neutral-100 py-4', className)}>
      <h2 className="px-6 text-xl font-normal text-midnight">Explore Vevericka</h2>

      <hr className="mx-6 mt-1 rounded border border-midnight/10" />

      {error && <p className="mx-auto my-8 text-center">Something went wrong</p>}
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

      <hr className="mx-6 mt-2 rounded border border-midnight/10" />

      <More />
    </div>
  );
}

export default ExploreCard;
