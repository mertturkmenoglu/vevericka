import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { createPublicApi } from './Api';
import { IRegisterRequest } from './models/IRegisterRequest';
import { IRegisterResponse } from './models/IRegisterResponse';
import { IError } from './models/IError';

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
      return null;
    }
  }

  public static async register(data: IRegisterRequest): Promise<IRegisterResponse | IError> {
    try {
      const response = await Auth.api.post<any, AxiosResponse<IRegisterResponse>, IRegisterRequest>('/register', data);
      return response.data;
    } catch (e: any) {
      if (axios.isAxiosError(e) && e.response) {
        return {
          message: e.response.data.message,
          status: e.response.status,
          isError: true,
        };
      }

      return {
        message: '',
        status: 500,
        isError: true,
      };
    }
  }
}
