import { createApi } from '@services/api';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { LoginRequest, LoginResponse, RegisterError, RegisterRequest, RegisterResponse } from './dto';

export class AuthApi {
  private api: AxiosInstance;

  constructor(axiosInstance?: AxiosInstance) {
    this.api = axiosInstance ? axiosInstance : createApi();
  }

  public async login(dto: LoginRequest): Promise<LoginResponse | null> {
    try {
      const response = await this.api.post<unknown, AxiosResponse<LoginResponse>, LoginRequest>('/auth/login', dto);

      const { id, username, email: emailFromResponse, image } = response.data;
      const token = response.headers.authorization;

      return {
        id,
        username,
        token: token || '',
        image,
        email: emailFromResponse,
      };
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
