import axios from 'axios'
import {IUser} from "@/api/responses/IUser";
import {IUserSearchResult} from "@/api/responses/IUserSearchResult";

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
        baseURL: 'https://vevericka-backend.herokuapp.com/api/v2/user',
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

    public static async searchByQuery(query: string): Promise<IUserSearchResult[]> {
        const res = await UserService.user.get<{ data: IUserSearchResult[] }>('/q', {
            params: {
                searchTerm: query
            }
        })
        return res.data.data
    }

    public static async followUser(thisUsername: string, otherUsername: string): Promise<boolean> {
        const data = {
            thisUsername,
            otherUsername,
        }

        await UserService.user.post('/follow', data)
        return true
    }

    public static async unfollowUser(thisUsername: string, otherUsername: string): Promise<boolean> {
        const data = {
            thisUsername,
            otherUsername,
        }

        await UserService.user.post('/unfollow', data)
        return true
    }
}

export default UserService
