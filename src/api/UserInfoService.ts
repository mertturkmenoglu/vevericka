import {IUser} from "./responses/IUser"
import {IResponse} from "@/api/IResponse";

export default class UserInfoService {
    public static readonly URL = "https://user-info-service.herokuapp.com"

    public static async getUserByUsername(username: string): Promise<IResponse<IUser>> {
        try {
            const url = `${this.URL}/user/username/${username}`;
            const response = await fetch(url);
            const data = await response.json();
            const result = data.user[0] as IUser
            return [result, null]
        } catch (e) {
            return [null, e.message]
        }
    }
}