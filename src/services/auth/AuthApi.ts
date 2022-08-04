import { createApi } from '@services/api';
import { AxiosInstance, AxiosResponse } from 'axios';
import { LoginRequest, LoginResponse } from './dto';

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
}
