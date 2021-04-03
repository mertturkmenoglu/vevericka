import axios from 'axios'
import {IUser} from "@/api/responses/IUser";

type LoginResponse = {
    userId: string;
    username: string;
    token: string;
}

class UserService {
    static readonly user = axios.create({
        baseURL: 'http://localhost:5000/api/v2/user',
        headers: {
            'authorization': JSON.parse(localStorage.getItem('vev-token') || '{token: ""}').token
        }
    })

    static async getUserByUsername(username: string): Promise<IUser> {
        const res = await UserService.user.get<{ data: IUser }>('/username/' + username)
        return res.data.data
    }

    public static async searchByQuery(query: string): Promise<IUser[]> {
        const res = await UserService.user.get<{ data: IUser[] }>('/q', {
            params: {
                searchTerm: query
            }
        })
        return res.data.data
    }
}

export default UserService