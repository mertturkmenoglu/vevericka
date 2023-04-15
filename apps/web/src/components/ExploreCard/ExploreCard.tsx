//import { Link } from 'react-router-dom';

import { ChevronRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

const explore = [
  {
    tag: 'Vevericka',
    count: 100_000_000,
  },
  {
    tag: 'Jean Valjean',
    count: 10_000_000,
  },
  {
    tag: 'Marius',
    count: 1_000_000,
  },
  {
    tag: 'Cosette',
    count: 987_654,
  },
  {
    tag: 'Fantine',
    count: 78_192,
  },
  {
    tag: 'Monsieur Madeleine',
    count: 50_121,
  },
  {
    tag: 'Gavroche',
    count: 9230,
  },
  {
    tag: 'Javert',
    count: 1002,
  },
  {
    tag: 'Enjolras',
    count: 947,
  },
  {
    tag: 'Eponine',
    count: 32,
  },
];

interface Props {
  className?: string;
}

function ExploreCard({ className }: Props): JSX.Element {
  const formatCount = (count: number) => {
    return Intl.NumberFormat('en-US', { notation: 'compact' }).format(count);
  };

  return (
    <article className={clsx('rounded bg-neutral-100 py-4', className)}>
      <h2 className="px-6 text-xl font-normal text-midnight">Explore Vevericka</h2>

      <hr className="mx-6 mt-1 rounded border border-midnight/10" />

      <div className="mt-2 space-y-2">
        {explore.map((it) => (
          <Link
            key={it.tag}
            to={'#'}
            className="flex items-center justify-between py-1 text-midnight transition-all duration-200 hover:bg-midnight/10"
          >
            <div className="px-6">
              <span className="font-medium">{it.tag}</span>

              <div className="flex items-baseline text-sm">
                <span className="font-normal">{formatCount(it.count)}</span>
                <span className="ml-1 font-light">posts</span>
              </div>
            </div>

            <div className="px-6">
              <ChevronRightIcon className="h-4 w-4" />
            </div>
          </Link>
        ))}
      </div>

      <hr className="mx-6 mt-2 rounded border border-midnight/10" />

      <Link
        to={'#'}
        className="mt-2 flex justify-end  px-6 text-sm font-semibold text-midnight"
      >
        <span className="items-end self-end rounded px-2 py-1 hover:bg-midnight/10">More</span>
      </Link>
    </article>
  );
}

export default ExploreCard;
