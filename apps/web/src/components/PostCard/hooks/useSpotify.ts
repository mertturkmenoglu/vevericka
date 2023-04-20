import { SpotifyType } from '../SpotifyIframe';

export function useSpotify(text: string) {
  const regex = /(http|https):\/\/open\.spotify\.com\/(track|album|playlist|show|episode|artist)\/[a-zA-Z0-9]+/;
  const spotifyMatch = text.match(regex);
  const res = spotifyMatch ? spotifyMatch[0] : null;
  const isSpotify = res !== null;
  const spotifyId = isSpotify ? res.split('/').pop() : null;
  const type = isSpotify ? res.split('/')[3] : null;

  const checkType = (t: string | null) => {
    return t === 'track' || t === 'artist' || t === 'album' || t === 'show' || t === 'episode' || t === 'playlist';
  };

  const finalIsSpotify = isSpotify && checkType(type);
  return { isSpotify: finalIsSpotify, spotifyId, type: type as SpotifyType };
}
