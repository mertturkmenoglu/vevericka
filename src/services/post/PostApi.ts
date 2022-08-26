import { AxiosInstance } from 'axios';
import { createApi, handleApiError, PaginationQuery, PaginatedResults, ApiResult } from '@services/index';
import { FeedPost, SinglePost } from './dto';

export class PostApi {
  private api: AxiosInstance;

  constructor(axiosInstance?: AxiosInstance) {
    this.api = axiosInstance ? axiosInstance : createApi();
  }

  public async getPostById(postId: number): Promise<ApiResult<SinglePost>> {
    try {
      const response = await this.api.get<SinglePost>(`/post/${postId}`);
      return {
        data: response.data,
      };
    } catch (e) {
      return {
        exception: handleApiError(e),
      };
    }
  }

  // public async createPost(dto: CreatePostDto): AsyncApiResult<SinglePost> {
  //   try {
  //     const response = await this.api.post<any, AxiosResponse<SinglePost>, CreatePostDto>('/', dto);
  //     return {
  //       data: response.data,
  //     };
  //   } catch (e) {
  //     return {
  //       exception: Api.handleApiError(e),
  //     };
  //   }
  // }

  // public async getPostsByUsername(
  //   username: string,
  //   paginationQuery: PaginationQuery
  // ): AsyncApiResult<PaginatedResults<Omit<Post, 'user'>[]>> {
  //   return {
  //     exception: new NotImplementedApiError(),
  //   };
  // }

  public async getFeedByUsername(
    username: string,
    paginationQuery: PaginationQuery
  ): Promise<ApiResult<PaginatedResults<FeedPost[]>>> {
    try {
      const response = await this.api.get<PaginatedResults<FeedPost[]>>(`/post/user/${username}/feed`, {
        params: {
          page: paginationQuery.page,
          pageSize: paginationQuery.pageSize,
          order: paginationQuery.order,
        },
      });
      return {
        data: response.data,
      };
    } catch (e) {
      return {
        exception: handleApiError(e),
      };
    }
  }

  public async likePost(postId: number): Promise<ApiResult<boolean>> {
    try {
      await this.api.post(`/post/${postId}/like`);
      return {
        data: true,
      };
    } catch (e) {
      return {
        exception: handleApiError(e),
      };
    }
  }

  public async dislikePost(postId: number): Promise<ApiResult<boolean>> {
    try {
      await this.api.post(`/post/${postId}/dislike`);
      return {
        data: true,
      };
    } catch (e) {
      return {
        exception: handleApiError(e),
      };
    }
  }

  public async likeNone(postId: number): Promise<ApiResult<boolean>> {
    try {
      await this.api.post(`/post/${postId}/like-none`);
      return {
        data: true,
      };
    } catch (e) {
      return {
        exception: handleApiError(e),
      };
    }
  }

  // public async getLikes(postId: number): Promise<PaginatedResults<MinimalUserResponse[]>> {}

  // public async getDislikes(postId: number): Promise<PaginatedResults<MinimalUserResponse[]>> {}

  // public async getPostComments(postId: number): Promise<PaginatedResults<Comment[]>> {}

  // public async createComment(dto: CreateCommentDto): Promise<Comment> {}

  // public async deleteComment(commentId: number): Promise<void> {}

  // public async getPostById(postId: string): Promise<IPost | null> {
  //   try {
  //     const response = await this.api.get<IPost>(`/${postId}`);
  //     return response.data;
  //   } catch (e) {
  //     return null;
  //   }
  // }

  // public async createPost(dto: CreatePostDto): Promise<boolean> {
  //   try {
  //     await this.api.post<any, AxiosResponse<{}>, CreatePostDto>('/', dto);
  //     return true;
  //   } catch (e) {
  //     return false;
  //   }
  // }
}
