import { AxiosInstance, AxiosResponse } from 'axios';
import { createApi } from './Api';
import { CreatePostDto } from './dto/CreatePostDto';
import { IPost } from './models/IPost';
import { PaginatedResult } from './models/PaginatedResult';

export class Post {
  public constructor(private readonly token: string) {}

  private get api(): AxiosInstance {
    return createApi('post', this.token);
  }

  public async getFeedByUsername(username: string): Promise<PaginatedResult<IPost> | null> {
    // const realEndpoint = `/feed/${username}`;
    const tmpEndpoint = `/user/${username}/feed`;
    try {
      const response = await this.api.get<PaginatedResult<IPost>>(tmpEndpoint, {
        params: {
          page: 1,
          pageSize: 20,
        },
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

  public async createPost(dto: CreatePostDto): Promise<boolean> {
    try {
      await this.api.post<any, AxiosResponse<{}>, CreatePostDto>('/', dto);
      return true;
    } catch (e) {
      return false;
    }
  }
}
