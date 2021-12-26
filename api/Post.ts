import axios, { AxiosInstance } from "axios";
import IPost from "../legacy/src/api/responses/IPost";
import { createApi } from "./Api";

export class Post {
  public constructor(private readonly token: string) { }

  private get api(): AxiosInstance {
    return createApi('post', this.token);
  }

  public async getFeedByUsername(username: string): Promise<IPost[] | null> {
    try {
      const response = await this.api.get<IPost[]>(`/feed/${username}`);
      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.error(e.message);
      }
      return null;
    }
  }
}
