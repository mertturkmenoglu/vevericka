import { IContentfulMedia } from './IContentfulMedia';

export interface IPlaylist {
  title: string;

  subtitle: string;

  thumbnail: IContentfulMedia;

  startsAt: string;

  endsAt: string;

  content: string;
}
