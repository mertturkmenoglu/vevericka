import { ContentfulMedia } from '@services/index';

export interface Playlist {
  title: string;

  subtitle: string;

  thumbnail: ContentfulMedia;

  startsAt: string;

  endsAt: string;

  content: string;
}
