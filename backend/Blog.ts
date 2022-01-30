import { AxiosInstance, AxiosResponse } from 'axios';
import { createPublicApi } from './Api';
import { IPlaylist } from './models/IPlaylist';

export class Blog {
  private get api(): AxiosInstance {
    return createPublicApi('blog');
  }

  public async getLatestPlaylist(): Promise<IPlaylist | null> {
    try {
      const response = await this.api.get<IPlaylist>('/playlist/latest');
      return response.data;
    } catch (e) {
      return null;
    }
  }
}
