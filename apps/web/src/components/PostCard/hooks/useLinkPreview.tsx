import { useLazyQuery } from '@apollo/client';
import { getFirstUrl } from '../../../lib';
import { linkPreviewQueryDocument } from '../../../graphql/queries/linkPreviewQuery';
import { useEffect } from 'react';

interface Activation {
  isYouTube: boolean;
  isSpotify: boolean;
  hasMedia: boolean;
}

export function useLinkPreview(text: string, activation: Activation) {
  const firstUrl = getFirstUrl(text);

  const [getPreview, { data, loading, error }] = useLazyQuery(linkPreviewQueryDocument);

  const canActivate = !activation.hasMedia && !activation.isYouTube && !activation.isSpotify;

  useEffect(() => {
    if (firstUrl && canActivate) {
      getPreview({
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