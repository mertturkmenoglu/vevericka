import { AxiosInstance } from 'axios';
import { createApi } from './Api';
import { IPost } from './models/IPost';
import { PaginatedResult } from './models/PaginatedResult';

export class Post {
  public constructor(private readonly token: string) { }

  private get api(): AxiosInstance {
    return createApi('post', this.token);
  }

  public async getFeedByUsername(username: string): Promise<PaginatedResult<IPost> | null> {
    // const realEndpoint = `/feed/${username}`;
    const tmpEndpoint = `/user/${username}`;
    try {
      const response = await this.api.get<PaginatedResult<IPost>>(tmpEndpoint, {
        params: {
          page: 1,
          pageSize: 20,
        }
      });
      return response.data;
    } catch (e) {
      return null;
    }
  }

  public async getPostById(postId: string): Promise<IPost | null> {
    try {
      const response = await this.api.get<IPost>(`/${postId}`);
      return response.data;
    } catch (e) {
      return null;
    }
  }
}
