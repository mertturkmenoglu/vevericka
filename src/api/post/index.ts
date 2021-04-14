import axios from 'axios'
import IPost from "@/api/responses/IPost";
import IBookmark from "@/api/responses/IBookmark";
import IComment from "@/api/responses/IComment";

type PostDto = {
    createdBy: string;
    content: string;
}

type BookmarkDto = {
    postId: string;
    belongsTo: string;
}

type CommentDto = {
    postId: string;
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

    static async getBookmarksByUsername(username: string): Promise<IPost[]> {
        const res = await PostService.post.get<IPost[]>('/bookmark/user/' + username)
        return res.data
    }

    static async deleteBookmark(bookmarkId: string): Promise<boolean> {
        await PostService.post.delete('/bookmark/' + bookmarkId);
        return true;
    }

    static async createBookmark(bookmark: BookmarkDto): Promise<IBookmark> {
        const res = await PostService.post.post<IBookmark>('/bookmark/', bookmark);
        return res.data
    }

    static async deletePost(postId: string): Promise<boolean> {
        await PostService.post.delete('/' + postId);
        return true;
    }

    static async createComment(comment: CommentDto): Promise<boolean> {
        await PostService.post.post<IComment>('/comment/', comment);
        return true
    }
}

export default PostService
