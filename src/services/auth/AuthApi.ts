import { createApi } from '@services/index';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { LoginRequest, LoginResponse, RegisterError, RegisterRequest, RegisterResponse } from './dto';

export class AuthApi {
  private api: AxiosInstance;

  constructor(axiosInstance?: AxiosInstance) {
    this.api = axiosInstance ? axiosInstance : createApi();
  }

  public async login(dto: LoginRequest): Promise<AxiosResponse<LoginResponse> | null> {
    try {
      const response = await this.api.post<unknown, AxiosResponse<LoginResponse>, LoginRequest>('/auth/login', dto);
      console.log('login op', response.headers);
      return response;
    } catch (e) {
      return null;
    }
  }

  public async register(dto: RegisterRequest): Promise<RegisterResponse | RegisterError> {
    try {
      const response = await this.api.post<unknown, AxiosResponse<RegisterResponse>, RegisterRequest>(
        '/auth/register',
        dto
      );
      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e) && e.response) {
        const err = e as any;
        return {
          message: err.response.data.message,
          status: err.response.status,
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

  public async logout(): Promise<boolean> {
    try {
      await this.api.post('/auth/logout');
      return true;
    } catch (e) {
      return false;
    }
  }
}
