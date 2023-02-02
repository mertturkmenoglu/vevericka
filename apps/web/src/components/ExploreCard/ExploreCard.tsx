//import { Link } from 'react-router-dom';

import { ChevronRightIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

const explore = [
  {
    tag: 'Vevericka',
    count: 100000,
  },
  {
    tag: 'Jean Valjean',
    count: 24601,
  },
  {
    tag: 'Javert',
    count: 9876,
  },
  {
    tag: 'Enjolras',
    count: 987,
  },
  {
    tag: 'Eponine',
    count: 87,
  },
];

interface Props {
  className?: string;
}

function ExploreCard({ className }: Props): JSX.Element {
  return (
    <article className={clsx('rounded bg-neutral-600/10 py-4 px-6', className)}>
      <h2 className="text-xl font-semibold text-midnight">Explore Vevericka</h2>

      <hr className="mt-1 rounded border border-midnight/10" />

      <div className="mt-2 space-y-2">
        {explore.map((it) => (
          <Link
            key={it.tag}
            to={'#'}
            className="flex items-center justify-between rounded px-2 py-1 text-midnight transition-all duration-200 hover:bg-midnight/10"
          >
            <div>
              <div>
                <span className="font-bold">#</span>
                <span className="ml-1 font-semibold">{it.tag}</span>
              </div>
              <div className="ml-3.5 flex items-baseline text-sm">
                <span className="font-semibold">{it.count}</span>
                <span className="ml-1">posts</span>
              </div>
            </div>

            <div>
              <ChevronRightIcon className="h-4 w-4" />
            </div>
          </Link>
        ))}
      </div>

      <hr className="mt-2 rounded border border-midnight/10" />

      <Link
        to={'#'}
        className="mt-2 flex justify-end  text-sm font-semibold text-midnight "
      >
        <span className="items-end self-end rounded px-2 py-1 hover:bg-midnight/10">More</span>
      </Link>
    </article>
  );
}

export default ExploreCard;
