import { useRef } from 'react';
import { ApiError, FeedPost, PaginatedResults, PaginationOrder, PaginationQuery, PostApi } from '@services/index';
import { QueryFunctionContext, useInfiniteQuery } from 'react-query';

export interface HomepageFeedOptions {
  token: string;
  username: string;
}

export function useHomepageFeed({ token, username }: HomepageFeedOptions) {
  const postApi = useRef(new PostApi(token)).current;

  const fetchFeed = async (context: QueryFunctionContext) => {
    const page = context.pageParam as number;

    const feedResponse = await postApi.getFeedByUsername(username, new PaginationQuery(PaginationOrder.DESC, page, 20));

    if (!feedResponse.data) {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw feedResponse.exception;
    }

    return feedResponse.data;
  };

  const {
    isLoading,
    isError,
    data: feedData,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery<PaginatedResults<FeedPost[]>, ApiError>('feed', fetchFeed, {
    getNextPageParam: (lastPage) => lastPage.pagination.currentPage + 1,
  });

  return {
    isLoading,
    isError,
    feedData,
    isFetchingNextPage,
    fetchNextPage,
  };
}
