import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export function useSearchTerm() {
  const [searchParams] = useSearchParams();

  const queryFromUrl = decodeURIComponent(searchParams.get('q') ?? '');
  const termTuple = useState(queryFromUrl);

  return termTuple;
}
