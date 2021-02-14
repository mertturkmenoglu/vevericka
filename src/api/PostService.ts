import {IResponse} from "@/api/IResponse";
import IPost from "@/api/responses/IPost";

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
}