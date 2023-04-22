import { useLazyQuery } from '@apollo/client';
import { SearchType } from '../../components';
import { searchPostsQueryDocument, searchUsersQueryDocument } from '../../graphql';

export function useSearchData(type: SearchType) {
  const [getPosts, postsResult] = useLazyQuery(searchPostsQueryDocument);
  const [getUsers, usersResult] = useLazyQuery(searchUsersQueryDocument);

  const search = (term: string) => {
    if (term === '' || !term) return;

    if (type === 'posts') {
      getPosts({
        variables: {
          term,
          skip: 0,
          take: 50,
        },
      });
    }

    if (type === 'users') {
      getUsers({
        variables: {
          term,
          skip: 0,
          take: 50,
        },
      });
    }
  };

  return {
    postsResult,
    usersResult,
    search,
  };
}
