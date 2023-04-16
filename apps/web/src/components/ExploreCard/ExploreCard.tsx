import clsx from 'clsx';
import More from './More';
import { data } from './data';
import Item from './Item';

interface Props {
  className?: string;
}

function ExploreCard({ className }: Props): JSX.Element {
  return (
    <div className={clsx('rounded bg-neutral-100 py-4', className)}>
      <h2 className="px-6 text-xl font-normal text-midnight">Explore Vevericka</h2>

      <hr className="mx-6 mt-1 rounded border border-midnight/10" />

      <div className="mt-2 space-y-2">
        {data.map((it) => (
          <Item
            item={it}
            key={it.tag}
          />
        ))}
      </div>

      <hr className="mx-6 mt-2 rounded border border-midnight/10" />

      <More />
    </div>
  );
}

export default ExploreCard;
