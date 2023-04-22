import { useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';
import { linkPreviewQueryDocument } from '../../../graphql/queries/linkPreviewQuery';
import { getFirstUrl } from '../../../lib';

interface Activation {
  isEmbed: boolean;
  hasMedia: boolean;
}

export function useLinkPreview(text: string, activation: Activation) {
  const firstUrl = getFirstUrl(text);

  const [getPreview, { data, loading, error }] = useLazyQuery(linkPreviewQueryDocument);

  const canActivate = !activation.hasMedia && !activation.isEmbed;

  useEffect(() => {
    if (firstUrl && canActivate) {
      getPreview({
        variables: {
          url: firstUrl,
        },
      });
    }
  }, [firstUrl, canActivate]);

  const showLinkPreview = !!firstUrl && !error && !!data && !loading && canActivate;

  return {
    showLinkPreview,
    data,
  };
}
