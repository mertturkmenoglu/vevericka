import axios, { AxiosInstance } from 'axios';
import IPost from '@/api/responses/IPost';
import IBookmark from '@/api/responses/IBookmark';
import { BASE_URL } from '../constants';

type BookmarkDto = {
  postId: string;
  belongsTo: string;
}

class BookmarkService {
  static get post(): AxiosInstance {
    return axios.create({
      baseURL: `${BASE_URL}/api/v2/bookmark`,
      headers: {
        authorization: localStorage.getItem('vev-token') || '',
      },
    });
  }

  static async getBookmarksByUsername(username: string): Promise<IPost[]> {
    const res = await BookmarkService.post.get<IPost[]>(`/user/${username}`);
    return res.data;
  }

  static async deleteBookmark(bookmarkId: string): Promise<boolean> {
    await BookmarkService.post.delete(`/${bookmarkId}`);
    return true;
  }

  static async createBookmark(bookmark: BookmarkDto): Promise<IBookmark> {
    const res = await BookmarkService.post.post<IBookmark>('/', bookmark);
    return res.data;
  }
}

export default BookmarkService;
