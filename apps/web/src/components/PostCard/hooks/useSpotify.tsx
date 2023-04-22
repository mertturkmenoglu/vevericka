import { checkSpotifyType, getSpotifyId, getSpotifyType, isSpotify as isSpotifyFn, SpotifyType } from '../../../lib';

export type UseSpotifyResult =
  | { isSpotify: false; spotifyId: null; type: null }
  | { isSpotify: true; spotifyId: string; type: SpotifyType };

export function useSpotify(text: string): UseSpotifyResult {
  const isSpotify = isSpotifyFn(text);

  if (!isSpotify) {
    return { isSpotify: false, spotifyId: null, type: null };
  }

  const spotifyId = getSpotifyId(text);
  const type = getSpotifyType(text);
  const isTypeCorrect = checkSpotifyType(type);

  if (!isTypeCorrect) {
    return { isSpotify: false, spotifyId: null, type: null };
  }

  return { isSpotify: true, spotifyId, type };
}
