import axios from 'axios'
import IPost from "@/api/responses/IPost";

type PostDto = {
    createdBy: string;
    content: string;
}

class PostService {
    static readonly post = axios.create({
        baseURL: process.env.NODE_ENV === 'production'
            ? 'https://vevericka-backend.herokuapp.com/api/v2/post'
            : 'http://localhost:5000/api/v2/post',
        headers: {
            'authorization': localStorage.getItem('vev-token') || ''
        }
    })

    static async getUserPosts(username: string): Promise<IPost[]> {
        const res = await PostService.post.get<IPost[]>('/user/' + username);
        return res.data;
    }

    static async getPostById(id: string): Promise<IPost> {
        const res = await PostService.post.get<IPost>('/' + id);
        return res.data;
    }

    static async getFeedByUsername(username: string): Promise<IPost[]> {
        const res = await PostService.post.get<IPost[]>('/feed/' + username)
        return res.data
    }

    static async createPost(post: PostDto): Promise<IPost> {
        const res = await PostService.post.post<IPost>('/', post)
        return res.data
    }

    static async deletePost(postId: string): Promise<boolean> {
        await PostService.post.delete('/' + postId);
        return true;
    }
}

export default PostService
