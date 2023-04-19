import { LinkIcon } from '@heroicons/react/24/outline';
import { detectHashtags, detectUsernames, linkify } from '../../lib';
import YouTubeIframe from './YouTubeIframe';
import { useMeta } from './useMeta';
import { useYouTube } from './useYouTube';

export interface PostContentProps {
  text: string;
  hasMedia: boolean;
}

function PostContent({ text, hasMedia }: PostContentProps): JSX.Element {
  const content = linkify(detectUsernames(detectHashtags(text)));
  const { isYouTube, youtubeId } = useYouTube(content);
  const showYoutubeIframe = isYouTube && !hasMedia;
  const { showLinkPreview, data } = useMeta(text, { hasMedia, isYouTube });

  if (!data) {
    return <></>;
  }

  return (
    <>
      <div
        dangerouslySetInnerHTML={{ __html: content }}
        className="text-sm"
      />
      {showYoutubeIframe && <YouTubeIframe id={youtubeId || ''} />}
      {showLinkPreview && (
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
}

export default PostContent;
