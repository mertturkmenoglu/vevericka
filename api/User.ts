import { AxiosInstance } from 'axios';
import { createApi } from './Api';

export type UserPopulated = {
  _id: string;
  name: string;
  username: string;
  image: string;
}

interface IUser {
  _id: string;
  username: string;
  name: string;
  email: string;
  image: string;
  hobbies: string[];
  features: string[];
  bdate?: Date;
  followers: UserPopulated[];
  following: UserPopulated[];
  location: {
    city?: string;
    country?: string;
  };
  job: string;
  school: string;
  website: string;
  twitter: string;
  bio: string;
  gender: string;
  languages: Array<{ language: string; proficiency: string }>;
  wishToSpeak: Array<string>;
}

export class User {
  public constructor(private readonly token: string) { }

  private get api(): AxiosInstance {
    return createApi('user', this.token);
  }

  public async getUserByUsername(username: string): Promise<IUser | null> {
    try {
      const response = await this.api.get<IUser>(`/username/${username}`);
      return response.data;
    } catch (e) {
      return null;
    }
  }
}
