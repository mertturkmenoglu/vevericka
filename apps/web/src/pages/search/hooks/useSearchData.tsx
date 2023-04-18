import { useLazyQuery } from '@apollo/client';
import { useSearchParams } from 'react-router-dom';
import { searchPostsQueryDocument, searchUsersQueryDocument } from '../../../graphql';
import { SearchType } from './useSearchType';

export function useSearchData(type: SearchType) {
  const [searchParams] = useSearchParams();

  const [getPosts, postsResult] = useLazyQuery(searchPostsQueryDocument);
  const [getUsers, usersResult] = useLazyQuery(searchUsersQueryDocument);

  const search = () => {
    const term = searchParams.get('q');
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
