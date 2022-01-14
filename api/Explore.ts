import { AxiosInstance } from 'axios';
import { ITag } from './models/ITag';
import { createApi } from './Api';

export class Explore {
  public constructor(private readonly token: string) { }

  private get api(): AxiosInstance {
    return createApi('explore', this.token);
  }

  public async getTags(): Promise<ITag[]> {
    try {
      const response = await this.api.get<ITag[]>('/tags');
      return response.data;
    } catch (e) {
      return [];
    }
  }
}
