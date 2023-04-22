import { PostCard, SearchType, UserCard } from '..';
import { TContent, TPostFragment, TUserFragment } from './types';

export interface SearchResultProps {
  type: SearchType;
  content: TContent;
}

function SearchResult({ type, content }: SearchResultProps): JSX.Element {
  if (type === 'posts') return <PostCard post={content as TPostFragment} />;
  return <UserCard user={content as TUserFragment} />;
}

export default SearchResult;
