import { Link } from 'react-router-dom';
import { LazyImage, PostCard } from '../../../components';
import { FragmentType, useFragment } from '../../../generated';
import { postFragmentDocument, userFragmentDocument } from '../../../graphql';
import { SearchType } from '../hooks/useSearchType';

interface UserCardProps {
  user: TUserFragment;
}

function UserCard({ user }: UserCardProps): JSX.Element {
  const data = useFragment(userFragmentDocument, user);
  return (
    <article>
      <Link
        to={`/u/${data.id}`}
        className="flex items-center space-x-4 rounded bg-midnight/10 px-4 py-2 text-midnight transition duration-200 ease-in-out hover:bg-midnight hover:text-white"
      >
        <LazyImage
          src={data.image}
          alt="User image"
          placeholderSrc="/user.jpg"
          placeholderAlt="Loading"
          className="min-h-16 min-w-16 aspect-square h-16 w-16 rounded-full"
        />
        <p className="text-xl">{data.name}</p>
      </Link>
    </article>
  );
}

type TPostFragment = FragmentType<typeof postFragmentDocument>;
type TUserFragment = FragmentType<typeof userFragmentDocument>;
type TContent = TPostFragment | TUserFragment;

export interface SearchResultProps {
  type: SearchType;
  content: TContent;
}

function SearchResult({ type, content }: SearchResultProps): JSX.Element {
  if (type === 'posts') return <PostCard post={content as TPostFragment} />;
  return <UserCard user={content as TUserFragment} />;
}

export default SearchResult;
