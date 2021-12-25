import axios, { AxiosInstance, AxiosResponse } from "axios";
import { createApi } from './Api';

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
    return createApi('auth');
  }

  public static async login(email: string, password: string): Promise<ILoginResponse | null> {
    try {
      const response = await Auth.api.post('/login', {
        email,
        password,
      });

      const { userId, username } = response.data;
      const token = response.headers.authorization;

      return {
        userId,
        username,
        token,
      }
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.error(e.message);
      }
      return null;
    }
  }
}
