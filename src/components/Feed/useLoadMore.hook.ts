import { useEffect } from 'react';
import { isElementInViewport } from '@utils/index';

export function useLoadMore(isFetching: boolean, onLoadMore: () => Promise<void>) {
  useEffect(() => {
    const scrollListener = () => {
      const loadMoreElement = document.querySelector<HTMLElement>('#home-feed-load-more');

      if (!loadMoreElement) {
        return;
      }

      if (isElementInViewport(loadMoreElement) && !isFetching) {
        onLoadMore();
      }
    };

    window.addEventListener('scroll', scrollListener);

    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  }, [onLoadMore, isFetching]);
}
