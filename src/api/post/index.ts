import axios from 'axios'
import IPost from "@/api/responses/IPost";
import IBookmark from "@/api/responses/IBookmark";

type PostDto = {
    createdBy: string;
    content: string;
}

type BookmarkDto = {
    postId: string;
    belongsTo: string;
}

class PostService {
    static readonly post = axios.create({
        baseURL: 'http://localhost:5000/api/v2/post',
        headers: {
            'authorization': JSON.parse(localStorage.getItem('vev-token') || '{token: ""}').token
        }
    })

    static async getFeedByUsername(username: string): Promise<IPost[]> {
        const res = await PostService.post.get<{ data: IPost[] }>('/feed/' + username)
        return res.data.data
    }

    static async createPost(post: PostDto): Promise<IPost> {
        const res = await PostService.post.post<{ data: IPost }>('/', post)
        return res.data.data
    }

    static async getBookmarksByUsername(username: string): Promise<IPost[]> {
        const res = await PostService.post.get<{ data: IPost[] }>('/bookmark/user/' + username)
        return res.data.data
    }

    static async createBookmark(bookmark: BookmarkDto): Promise<IBookmark> {
        const res = await PostService.post.post<{ data: IBookmark }>('/bookmark/', bookmark);
        return res.data.data
    }

    static async deletePost(postId: string): Promise<boolean> {
        await PostService.post.delete('/' + postId);
        return true;
    }
}

export default PostService