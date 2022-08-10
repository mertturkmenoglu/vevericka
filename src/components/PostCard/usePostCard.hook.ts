import { useRouterDateLocale } from '@hooks/index';
import { FeedPost } from '@services/post';
import formatDistanceToNowStrict from 'date-fns/formatDistanceToNowStrict';
import { useMemo } from 'react';

export function usePostCard(post: FeedPost) {
  const dateLocal = useRouterDateLocale();

  const formattedDate = useMemo(() => {
    return formatDistanceToNowStrict(new Date(post.createdAt), { locale: dateLocal, addSuffix: true });
  }, [post, dateLocal]);

  return {
    formattedDate,
  };
}
