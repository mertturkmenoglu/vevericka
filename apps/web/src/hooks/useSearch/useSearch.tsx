import { useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSearchData } from './useSearchData';
import { useSearchTerm } from './useSearchTerm';
import { useSearchType } from './useSearchType';

export function useSearch() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [type, setType] = useSearchType();
  const [term, setTerm] = useSearchTerm();
  const { postsResult, usersResult, search } = useSearchData(type);

  const onSearch = () => {
    if (term === '') {
      searchParams.delete('q');
    } else {
      searchParams.set('q', encodeURIComponent(term));
    }

    setSearchParams(searchParams);

    if (term === '') return;
    search(term);
  };

  const searchData = useMemo(() => {
    if (type === 'posts') return postsResult.data?.searchPosts;
    return usersResult.data?.searchUsers;
  }, [postsResult, usersResult, type]);

  const isLoading = postsResult.loading || usersResult.loading;

  const showResults = !isLoading && (searchData?.length ?? 0) > 0;
  const isCalled = postsResult.called || usersResult.called;
  const isNoResult = !isLoading && isCalled && (searchData?.length ?? 0) === 0 && term !== '';

  return {
    type,
    setType,
    term,
    setTerm,
    onSearch,
    isLoading,
    showResults,
    searchData,
    isNoResult,
  };
}
