import { useQuery } from '@apollo/client';
import { feedQueryDocument } from '../../graphql';
import { useEffect, useState } from 'react';
import { isElementInViewport } from '../../lib';

export function useFeed(loadMoreId: string) {
  const [isEnd, setIsEnd] = useState(false);
  const [page, setPage] = useState(1);
  const TAKE = 50;
  const query = useQuery(feedQueryDocument, {
    variables: {
      skip: (page - 1) * TAKE,
      take: TAKE,
    },
  });

  const onLoadMore = async (p: number) => {
    const result = await query.fetchMore({
      variables: {
        skip: p * TAKE,
        take: TAKE,
      },
    });

    if (result.data.feed.posts.length === 0) {
      setIsEnd(true);
    }

    setPage((prev) => prev + 1);
  };

  useEffect(() => {
    const scrollListener = () => {
      const loadMoreElement = document.getElementById(loadMoreId);

      if (!loadMoreElement) {
        return;
      }

      if (isElementInViewport(loadMoreElement) && !query.loading && !isEnd) {
        onLoadMore(page);
      }
    };

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  }, [query.loading, loadMoreId, isEnd, page]);

  return query;
}
