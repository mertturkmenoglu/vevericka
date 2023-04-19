import { useLazyQuery } from '@apollo/client';
import { detectHashtags, detectUsernames, getFirstUrl, linkify } from './post-utils';
import { getYoutubeIframe } from './youtube-iframe';
import { linkPreviewQueryDocument } from '../../graphql/queries/linkPreviewQuery';
import { useEffect } from 'react';
import { LinkIcon } from '@heroicons/react/24/outline';

export const getPostContent = (text: string): JSX.Element => {
  const content = linkify(detectUsernames(detectHashtags(text)));
  const youtubeIframe = getYoutubeIframe(content);
  const firstUrl = getFirstUrl(text);

  const [getMeta, { data, loading, error }] = useLazyQuery(linkPreviewQueryDocument);

  useEffect(() => {
    if (firstUrl && !youtubeIframe) {
      getMeta({
        variables: {
          url: firstUrl,
        },
      });
    }
  }, [firstUrl, youtubeIframe]);

  const shouldShowLinkPreview = firstUrl && !error && data && !loading && !youtubeIframe;

  return (
    <>
      <div
        dangerouslySetInnerHTML={{ __html: content }}
        className="text-sm"
      />
      {youtubeIframe}
      {shouldShowLinkPreview && (
        <a
          href={data.linkPreview.url ?? ''}
          className="mt-4 block rounded bg-neutral-100"
        >
          {data.linkPreview.image && (
            <img
              src={data.linkPreview.image}
              className="aspect-video w-full rounded-t object-cover"
            />
          )}

          {!data.linkPreview.image && (
            <div className="flex aspect-video w-full items-center justify-center rounded-t bg-neutral-200">
              <LinkIcon className="h-5 w-5 text-midnight" />
            </div>
          )}

          <div
            className="mt-2 px-2 font-medium"
            style={{
              fontFamily: 'Jost',
            }}
          >
            {data.linkPreview.title}
          </div>
          <div
            className="px-2 pb-2 text-xs font-light"
            style={{
              fontFamily: 'Jost',
            }}
          >
            {data.linkPreview.description ?? data.linkPreview.url}
          </div>
        </a>
      )}
    </>
  );
};
