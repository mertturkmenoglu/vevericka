import SpotifyIframe, { SpotifyIframeProps } from './frames/SpotifyIframe';
import YouTubeIframe, { YouTubeIframeProps } from './frames/YouTubeIframe';

export type EmbedProps = { type: 'youtube'; data: YouTubeIframeProps } | { type: 'spotify'; data: SpotifyIframeProps };

function Embed({ type, data }: EmbedProps): JSX.Element {
  return (
    <>
      {type === 'youtube' && <YouTubeIframe {...data} />}
      {type === 'spotify' && <SpotifyIframe {...data} />}
    </>
  );
}

export default Embed;
