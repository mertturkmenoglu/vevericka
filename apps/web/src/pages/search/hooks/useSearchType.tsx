import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export type SearchType = 'users' | 'posts';

export function useSearchType() {
  const [searchParams, setSearchParams] = useSearchParams();
  const typeFromUrl = decodeURIComponent(searchParams.get('type') ?? '');
  const typeStateTuple = useState<SearchType>(() => {
    if (typeFromUrl === 'users' || typeFromUrl === 'posts') return typeFromUrl;
    if (typeFromUrl === '') return 'posts';

    searchParams.set('type', 'posts');
    setSearchParams(searchParams);

    return 'posts';
  });

  return typeStateTuple;
}
