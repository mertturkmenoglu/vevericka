import { getYouTubeId, isYouTube as isYouTubeFn } from '../../../lib/';

type UseYoutubeResult = { isYouTube: boolean; youtubeId: string } | { isYouTube: false; youtubeId: null };

export function useYouTube(text: string): UseYoutubeResult {
  const isYouTube = isYouTubeFn(text);

  if (!isYouTube) {
    return { isYouTube, youtubeId: null };
  }

  return { isYouTube, youtubeId: getYouTubeId(text) };
}
