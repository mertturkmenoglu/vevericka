import axios from 'axios'

type LoginResponse = {
    userId: string;
    username: string;
    token: string;
}

class AuthService {
    static readonly auth = axios.create({
        baseURL: 'http://localhost:5000/api/v2/auth',
    })

    static async login(email: string, password: string): Promise<LoginResponse> {
        const resp = await AuthService.auth.post('/login', {
            email,
            password
        })

        const data = resp.data.data
        const { userId, username } = data
        const token = resp.headers['authorization']

        return {
            userId,
            username,
            token
        }
    }

    static async register(email: string, username: string, name: string, password: string): Promise<string | null> {
        console.log('sending register request')
        const resp = await AuthService.auth.post('/register', {
            email, username, name, password
        })

        const data = resp.data
        if (data['id']) {
            console.log('login positive. id,', data['id'])
            return data['id']
        }

        return null
    }
}

export default AuthService