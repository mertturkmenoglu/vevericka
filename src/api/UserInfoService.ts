import {IUser} from "./responses/IUser"
import {IResponse} from "@/api/IResponse";

export default class UserInfoService {
    public static readonly URL = "https://user-info-service.herokuapp.com"

    public static async getUserByUsername(username: string): Promise<IResponse<IUser>> {
        try {
            const url = `http://localhost:5000/api/v2/user/username/${username}`;
            const response = await fetch(url);
            const data = await response.json();
            const result = data.user[0] as IUser
            return [result, null]
        } catch (e) {
            return [null, e.message]
        }
    }

    public static async searchByQuery(query: string): Promise<IResponse<Array<IUser>>> {
        try {
            const URL = `${this.URL}/user/q?searchTerm=${query}`
            const response = await fetch(URL)
            const data = await response.json()

            if (!data.users || data.users.length === 0) {
                return [null, "Not found"]
            }

            return [data.users, null]
        } catch (e) {
            return [null, e.message]
        }
    }
}