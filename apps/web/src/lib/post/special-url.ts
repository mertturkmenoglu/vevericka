import { spotifyRegex, twitterRegex, wikipediaRegex, youtubeRegex } from './regex';

export type SpotifyType = 'track' | 'album' | 'playlist' | 'show' | 'episode' | 'artist';

export function isYouTube(text: string): boolean {
  const match = text.match(youtubeRegex);
  return match !== null;
}

export function isSpotify(text: string): boolean {
  const match = text.match(spotifyRegex);
  return match !== null;
}

export function isTwitter(text: string): boolean {
  const match = text.match(twitterRegex);
  return match !== null;
}

export function isWikipedia(text: string): boolean {
  const match = text.match(wikipediaRegex);
  return match !== null;
}

export function getYouTubeId(text: string): string {
  const match = text.match(youtubeRegex);

  if (!match || !match[1]) {
    throw new Error('Invalid YouTube URL');
  }

  return match[1];
}

export function getSpotifyId(text: string): string {
  const match = text.match(spotifyRegex);

  if (!match || !match[0]) {
    throw new Error('Invalid Spotify URL');
  }

  const id = match[0].split('/').pop();

  if (!id) {
    throw new Error('Invalid Spotify URL');
  }

  return id;
}

export function getSpotifyType(text: string): string {
  const match = text.match(spotifyRegex);

  if (!match || !match[0]) {
    throw new Error('Invalid Spotify URL');
  }

  const type = match[0].split('/')[3];

  if (!type) {
    throw new Error('Invalid Spotify URL');
  }

  return type;
}

export function checkSpotifyType(type: string): type is SpotifyType {
  return (
    type === 'track' ||
    type === 'artist' ||
    type === 'album' ||
    type === 'show' ||
    type === 'episode' ||
    type === 'playlist'
  );
}
