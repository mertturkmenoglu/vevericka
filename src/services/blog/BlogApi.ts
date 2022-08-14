import { createApi, Playlist } from '@services/index';
import { AxiosInstance } from 'axios';

export class BlogApi {
  private api: AxiosInstance;

  constructor(axiosInstance?: AxiosInstance) {
    this.api = axiosInstance ? axiosInstance : createApi();
  }

  public async getLatestPlaylist(): Promise<Playlist | null> {
    try {
      const response = await this.api.get<Playlist>('/blog/playlist/latest');
      return response.data;
    } catch (e) {
      return null;
    }
  }
}
