import axios, { AxiosInstance } from "axios";
import ITag from "../legacy/src/api/responses/ITag";
import { createApi } from "./Api";

export class Explore {
  public constructor(private readonly token: string) { }

  private get api(): AxiosInstance {
    return createApi('explore', this.token);
  }

  public async getTags(): Promise<ITag[]> {
    try {
      const response = await this.api.get<ITag[]>(`/tags`);
      return response.data;
    } catch (e) {
      if (axios.isAxiosError(e)) {
        console.error(e.message);
      }
      return [];
    }
  }
}
