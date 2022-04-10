import { AxiosInstance } from 'axios';
import { createApi } from './Api';
import { Profile } from './common/models/Profile';
import { IUser } from './models/IUser';

export class User {
  public constructor(private readonly token: string) {}

  private get api(): AxiosInstance {
    return createApi('user', this.token);
  }

  public async getUserByUsername(username: string): Promise<IUser | null> {
    try {
      const response = await this.api.get<IUser>(`/${username}/profile`);
      return response.data;
    } catch (e) {
      return null;
    }
  }

  public async setProfilePicture(username: string, url: string): Promise<IUser | null> {
    try {
      const response = await this.api.post<IUser>(`/${username}/profile-picture`, {
        url,
      });
      return response.data;
    } catch (e) {
      return null;
    }
  }

  public async getProfileByUsername(username: string): Promise<Profile | null> {
    try {
      const response = await this.api.get<Profile>(`/${username}/profile`);
      return response.data;
    } catch (e) {
      return null;
    }
  }
}
