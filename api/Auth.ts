import { AxiosInstance, AxiosResponse } from 'axios';
import { createPublicApi } from './Api';

interface ILoginRequest {
  email: string;
  password: string;
}

interface ILoginResponse {
  userId: string;
  username: string;
  token: string;
}

export class Auth {
  private static get api(): AxiosInstance {
    return createPublicApi('auth');
  }

  public static async login(email: string, password: string): Promise<ILoginResponse | null> {
    try {
      const response = await Auth.api.post<any, AxiosResponse<ILoginResponse>, ILoginRequest>('/login', {
        email,
        password,
      });

      const { userId, username } = response.data;
      const token = response.headers.authorization;

      return {
        userId,
        username,
        token,
      };
    } catch (e) {
      return null;
    }
  }
}
