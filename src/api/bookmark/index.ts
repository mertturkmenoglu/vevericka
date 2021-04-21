import IPost from "@/api/responses/IPost";
import IBookmark from "@/api/responses/IBookmark";
import axios from "axios";

type BookmarkDto = {
    postId: string;
    belongsTo: string;
}

class BookmarkService {
    static get post() {
        return axios.create({
            baseURL: process.env.NODE_ENV === 'production'
                ? 'https://vevericka-backend.herokuapp.com/api/v2/bookmark'
                : 'http://localhost:5000/api/v2/bookmark',
            headers: {
                'authorization': localStorage.getItem('vev-token') || ''
            }
        })
    }

    static async getBookmarksByUsername(username: string): Promise<IPost[]> {
        const res = await BookmarkService.post.get<IPost[]>('/user/' + username)
        return res.data
    }

    static async deleteBookmark(bookmarkId: string): Promise<boolean> {
        await BookmarkService.post.delete('/' + bookmarkId);
        return true;
    }

    static async createBookmark(bookmark: BookmarkDto): Promise<IBookmark> {
        const res = await BookmarkService.post.post<IBookmark>('/', bookmark);
        return res.data
    }
}

export default BookmarkService;
