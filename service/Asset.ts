import axios, { AxiosInstance } from 'axios';
import { createPublicApi } from './Api';
import { IUploadImageResponse } from './models/IUploadImageResponse';
import { IUploadLink } from './models/IUploadLink';

export class Asset {
  // noinspection JSMethodCanBeStatic
  private get api(): AxiosInstance {
    return createPublicApi('asset');
  }

  public async getUploadLink(): Promise<IUploadLink | null> {
    try {
      const response = await this.api.get<IUploadLink>('/image/upload-link');
      return response.data;
    } catch (e) {
      return null;
    }
  }

  public async uploadImage(url: string, data: FormData): Promise<IUploadImageResponse | null> {
    try {
      const response = await axios({
        method: 'POST',
        url: url,
        data: data,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (e) {
      return null;
    }
  }
}
