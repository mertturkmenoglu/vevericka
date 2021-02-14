import {IResponse} from "@/api/IResponse";
import IPost from "@/api/responses/IPost";
import IBookmark from "@/api/responses/IBookmark";

export default class PostService {
    static readonly URL = "https://vevericka-post-service.herokuapp.com"

    public static async getFeedByUsername(username: string): Promise<IResponse<Array<IPost>>> {
        try {
            const url = `${this.URL}/post/feed/${username}`;
            const response = await fetch(url);
            const {data} = await response.json();
            const result = data as Array<IPost>;
            return [result, null]
        } catch (e) {
            return [null, e.message]
        }
    }

    public static async getBookmarksByUsername(username: string): Promise<IResponse<Array<IBookmark>>> {
        try {
            const url = `${this.URL}/bookmark/user/${username}`
            const response = await fetch(url)
            const {data} = await response.json()
            const result = data as Array<IBookmark>
            return [result, null]
        } catch (e) {
            return [null, e.message];
        }
    }

    public static async getPostById(id: string): Promise<IResponse<IPost>> {
        try {
            const url = `${this.URL}/post/${id}`
            const response = await fetch(url)
            const {data} = await response.json()
            const result = data as IPost
            return [result, null]
        } catch (e) {
            return [null, e.message]
        }
    }
}