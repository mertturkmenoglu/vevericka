import axios from 'axios'
import IPost from "@/api/responses/IPost";

class PostService {
    static readonly post = axios.create({
        baseURL: 'http://localhost:5000/api/v2/post',
        headers: {
            'authorization': JSON.parse(localStorage.getItem('vev-token') || '{token: ""}').token
        }
    })

    static async getFeedByUsername(username: string): Promise<IPost[]> {
        const res = await PostService.post.get<IPost[]>('/feed/' + username)
        return res.data
    }
}

export default PostService