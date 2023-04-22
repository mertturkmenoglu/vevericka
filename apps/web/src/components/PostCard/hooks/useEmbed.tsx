import { Embed } from '../../Embed';
import { useSpotify } from './useSpotify';
import { useYouTube } from './useYouTube';

export function useEmbed(text: string, hasMedia: boolean): JSX.Element | null {
  const { isYouTube, youtubeId } = useYouTube(text);
  const { isSpotify, spotifyId, type } = useSpotify(text);

  if (hasMedia) {
    return null;
  }

  if (isYouTube) {
    return (
      <Embed
        type="youtube"
        data={{
          id: youtubeId,
        }}
      />
    );
  }

  if (isSpotify) {
    return (
      <Embed
        type="spotify"
        data={{
          id: spotifyId,
          type,
        }}
      />
    );
  }

  return null;
}
