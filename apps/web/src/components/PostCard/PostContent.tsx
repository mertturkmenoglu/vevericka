import { LinkIcon } from '@heroicons/react/24/outline';
import { detectHashtags, detectUsernames, linkify } from '../../lib';
import YouTubeIframe from './YouTubeIframe';
import { useLinkPreview } from './useLinkPreview';
import { useYouTube } from './useYouTube';
import { useSpotify } from './useSpotify';
import SpotifyIframe from './SpotifyIframe';

export interface PostContentProps {
  text: string;
  hasMedia: boolean;
}

function PostContent({ text, hasMedia }: PostContentProps): JSX.Element {
  const content = linkify(detectUsernames(detectHashtags(text)));
  const { isYouTube, youtubeId } = useYouTube(content);
  const { isSpotify, spotifyId, type } = useSpotify(content);
  const showYoutubeIframe = isYouTube && !hasMedia;
  const showSpotifyIframe = isSpotify && !hasMedia;
  const { showLinkPreview, data } = useLinkPreview(text, { hasMedia, isYouTube, isSpotify });

  const urlWithValidProtocol = (url?: string | null | undefined) => {
    if (!url || url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }

    return `https://${url}`;
  };

  return (
    <>
      <div
        dangerouslySetInnerHTML={{ __html: content }}
        className="break-words break-all text-sm"
      />
      {showYoutubeIframe && <YouTubeIframe id={youtubeId || ''} />}
      {showSpotifyIframe && (
        <SpotifyIframe
          id={spotifyId || ''}
          type={type || 'track'}
        />
      )}
      {showLinkPreview && data && (
        <a
          href={urlWithValidProtocol(data.linkPreview.url) ?? ''}
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
            className="break-words px-2 pb-2 text-xs font-light"
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
