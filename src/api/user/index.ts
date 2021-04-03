import axios from 'axios'
import {IUser} from "@/api/responses/IUser";

type Language = {
    language: string;
    proficiency: string;
}

type Location = {
    city?: string
    country?: string
}

type UpdateUserDto = {
    username: string;
    name?: string;
    image?: string;
    hobbies?: string[];
    features?: string[];
    bdate?: Date;
    location?: Location;
    job?: string;
    school?: string;
    website?: string;
    twitter?: string;
    bio?: string;
    gender?: string;
    languages?: Language[];
    wishToSpeak: string[];
}

class UserService {
    static readonly user = axios.create({
        baseURL: 'http://vevericka-backend.herokuapp.com/api/v2/user',
        headers: {
            'authorization': localStorage.getItem('vev-token') || ''
        }
    })

    static async updateUser(updateUserDto: UpdateUserDto): Promise<boolean> {
        await UserService.user.put('/', updateUserDto)
        return true;
    }

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