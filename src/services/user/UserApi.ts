import { createApi } from '@services/index';
import { AxiosInstance } from 'axios';
import { GetUserByUsernameRequest, GetUserByUsernameResponse } from './dto';

export class UserApi {
  private api: AxiosInstance;

  constructor(token: string, axiosInstance?: AxiosInstance) {
    this.api = axiosInstance ? axiosInstance : createApi(token);
  }

  public async getUserByUsername(dto: GetUserByUsernameRequest): Promise<GetUserByUsernameResponse | null> {
    try {
      const response = await this.api.get<GetUserByUsernameResponse>(`/user/${dto.username}/profile`);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  public async getProfileByUsername(username: string): Promise<GetUserByUsernameResponse | null> {
    try {
      const response = await this.api.get<GetUserByUsernameResponse>(`/user/${username}/profile`);
      return response.data;
    } catch (e) {
      return null;
    }
  }
}
