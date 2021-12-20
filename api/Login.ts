import { AxiosInstance } from "axios";
import { createApi } from './Api';

export class Login {
  private static get api(): AxiosInstance {
    return createApi('auth');
  }
}
