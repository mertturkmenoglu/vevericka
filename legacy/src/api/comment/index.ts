import axios, { AxiosInstance } from 'axios';
import IComment from '@/api/responses/IComment';
import { BASE_URL } from '../constants';

type CommentDto = {
  postId: string;
  createdBy: string;
  content: string;
}

class CommentService {
  static get post(): AxiosInstance {
    return axios.create({
      baseURL: `${BASE_URL}/api/v2/comment`,
      headers: {
        authorization: localStorage.getItem('vev-token') || '',
      },
    });
  }

  static async createComment(comment: CommentDto): Promise<boolean> {
    await CommentService.post.post<IComment>('/', comment);
    return true;
  }
}

export default CommentService;
