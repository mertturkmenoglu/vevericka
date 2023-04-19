import { useLazyQuery } from '@apollo/client';
import { getFirstUrl } from '../../lib/post/post-utils';
import { linkPreviewQueryDocument } from '../../graphql/queries/linkPreviewQuery';
import { useEffect } from 'react';

interface Activation {
  isYouTube: boolean;
  hasMedia: boolean;
}

export function useMeta(text: string, activation: Activation) {
  const firstUrl = getFirstUrl(text);

  const [getMeta, { data, loading, error }] = useLazyQuery(linkPreviewQueryDocument);

  const canActivate = !activation.hasMedia && !activation.isYouTube;

  useEffect(() => {
    if (firstUrl && canActivate) {
      getMeta({
        variables: {
          url: firstUrl,
        },
      });
    }
  }, [firstUrl, canActivate]);

  const showLinkPreview = firstUrl && !error && data && !loading && canActivate;

  return {
    showLinkPreview,
    data,
  };
}
