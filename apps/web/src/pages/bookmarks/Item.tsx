import { PostCard } from '../../components';
import { FragmentType } from '../../generated';
import { postFragmentDocument } from '../../graphql';

export interface ItemProps {
  id: string;
  post: FragmentType<typeof postFragmentDocument>;
}

function Item({ post }: ItemProps): JSX.Element {
  return (
    <div>
      <PostCard post={post} />
    </div>
  );
}

export default Item;
