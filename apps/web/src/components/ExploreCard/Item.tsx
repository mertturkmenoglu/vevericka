import { ChevronRightIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import { PopularTag } from '../../generated/graphql';

export interface ItemProps {
  item: PopularTag;
}

const formatCount = (count: number) => {
  return Intl.NumberFormat('en-US', { notation: 'compact' }).format(count);
};

export function Item({ item }: ItemProps): JSX.Element {
  return (
    <Link
      to={`/explore/${encodeURIComponent(item.tagName.substring(1))}`}
      className="flex items-center justify-between py-1 text-midnight transition-all duration-200 hover:bg-midnight/10"
    >
      <div className="px-6">
        <span className="break-all text-sm font-medium">{item.tagName.substring(1)}</span>

        <div className="flex items-baseline text-xs">
          <span className="font-normal">{formatCount(item._count.posts)}</span>
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
