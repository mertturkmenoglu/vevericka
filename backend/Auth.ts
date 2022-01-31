import { AxiosInstance, AxiosResponse } from 'axios';
import { createPublicApi } from './Api';

interface ILoginRequest {
  email: string;
  password: string;
}

interface ILoginResponse {
  id: number;
  username: string;
  email: string;
  image: string;
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

      const { id, username, email: Email, image } = response.data;
      const token = response.headers.authorization;

      return {
        id,
        username,
        token,
        image,
        email: Email
      };
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
      return null;
    }
  }
}
