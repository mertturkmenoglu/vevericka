import axios, {AxiosInstance} from 'axios';
import IPost from '@/api/responses/IPost';

export type Tag = {
    tag: string;
    count: number;
}

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
      baseURL: process.env.NODE_ENV === 'production'
        ? 'https://vevericka-backend.herokuapp.com/api/v2/explore'
        : 'http://localhost:5000/api/v2/explore',
      headers: {
        'authorization': localStorage.getItem('vev-token') || '',
      },
    });
  }

  static async getTags(): Promise<Tag[]> {
    const res = await ExploreService.service.get<Tag[]>('/tags');
    return res.data;
  }

  static async getPostsByTag(tag: string): Promise<IPost[]> {
    const res = await ExploreService.service.get<IPost[]>('/tag/' + tag);
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
