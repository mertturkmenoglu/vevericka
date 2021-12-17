import axios, { AxiosInstance } from 'axios';
import IPost from '@/api/responses/IPost';
import { BASE_URL } from '../constants';

type PostDto = {
  createdBy: string;
  content: string;
}

class PostService {
  static get post(): AxiosInstance {
    return axios.create({
      baseURL: `${BASE_URL}/api/v2/post`,
      headers: {
        authorization: localStorage.getItem('vev-token') || '',
      },
    });
  }

  static async getUserPosts(username: string): Promise<IPost[]> {
    const res = await PostService.post.get<IPost[]>(`/user/${username}`);
    return res.data;
  }

  static async getPostById(id: string): Promise<IPost> {
    const res = await PostService.post.get<IPost>(`/${id}`);
    return res.data;
  }

  static async getFeedByUsername(username: string): Promise<IPost[]> {
    const res = await PostService.post.get<IPost[]>(`/feed/${username}`);
    return res.data;
  }

  static async createPost(post: PostDto): Promise<IPost> {
    const res = await PostService.post.post<IPost>('/', post);
    return res.data;
  }

  static async deletePost(postId: string): Promise<boolean> {
    await PostService.post.delete(`/${postId}`);
    return true;
  }
}

export default PostService;
