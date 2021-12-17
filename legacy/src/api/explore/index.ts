import axios, { AxiosInstance } from 'axios';
import IPost from '@/api/responses/IPost';
import ITag from '@/api/responses/ITag';
import { BASE_URL } from '../constants';

export type TrendingPerson = {
  user: {
    name: string;
    username: string;
    image: string;
  };
}

class ExploreService {
  static get service(): AxiosInstance {
    return axios.create({
      baseURL: `${BASE_URL}/api/v2/explore`,
      headers: {
        authorization: localStorage.getItem('vev-token') || '',
      },
    });
  }

  static async getTags(): Promise<ITag[]> {
    const res = await ExploreService.service.get<ITag[]>('/tags');
    return res.data;
  }

  static async getPostsByTag(tag: string): Promise<IPost[]> {
    const res = await ExploreService.service.get<IPost[]>(`/tag/${tag}`);
    return res.data;
  }

  static async getTrendingPeople(): Promise<TrendingPerson[]> {
    const res = await ExploreService.service.get<TrendingPerson[]>('/people');
    return res.data;
  }

  static async getTrendingPosts(): Promise<IPost[]> {
    const res = await ExploreService.service.get<IPost[]>('/posts');
    return res.data;
  }
}

export default ExploreService;
