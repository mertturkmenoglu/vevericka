import { Link } from 'react-router-dom';
import { ExploreItem } from './data';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

export interface ItemProps {
  item: ExploreItem;
}

const formatCount = (count: number) => {
  return Intl.NumberFormat('en-US', { notation: 'compact' }).format(count);
};

export function Item({ item }: ItemProps): JSX.Element {
  return (
    <Link
      to={`/explore/${encodeURIComponent(item.tag)}`}
      className="flex items-center justify-between py-1 text-midnight transition-all duration-200 hover:bg-midnight/10"
    >
      <div className="px-6">
        <span className="font-medium">{item.tag}</span>

        <div className="flex items-baseline text-sm">
          <span className="font-normal">{formatCount(item.count)}</span>
          <span className="ml-1 font-light">posts</span>
        </div>
      </div>

      <div className="px-6">
        <ChevronRightIcon className="h-4 w-4" />
      </div>
    </Link>
  );
}

export default Item;
