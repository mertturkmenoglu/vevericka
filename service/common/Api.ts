import axios from 'axios';
import { ApiError } from './ApiError';
import { ApiResult } from './ApiResult';
import { DefaultApiError } from './DefaultApiError';

export class Api {
  public static handleApiError(e: unknown): ApiError {
    if (axios.isAxiosError(e) && e.response) {
      return {
        statusCode: e.response.status,
        message: e.response.data.message,
        error: e.message,
      };
    }

    return new DefaultApiError();
  }
}
