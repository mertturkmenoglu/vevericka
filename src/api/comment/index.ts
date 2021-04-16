import axios from 'axios'
import IComment from "@/api/responses/IComment";

type CommentDto = {
    postId: string;
    createdBy: string;
    content: string;
}

class CommentService {
    static readonly post = axios.create({
        baseURL: process.env.NODE_ENV === 'production'
            ? 'https://vevericka-backend.herokuapp.com/api/v2/comment'
            : 'http://localhost:5000/api/v2/comment',
        headers: {
            'authorization': localStorage.getItem('vev-token') || ''
        }
    })

    static async createComment(comment: CommentDto): Promise<boolean> {
        await CommentService.post.post<IComment>('/', comment);
        return true
    }
}

export default CommentService