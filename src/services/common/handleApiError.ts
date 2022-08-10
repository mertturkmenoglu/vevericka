import axios from 'axios';
import { ApiError, DefaultApiError } from '.';

export function handleApiError(e: unknown): ApiError {
  if (axios.isAxiosError(e) && e.response) {
    return {
      statusCode: e.response.status,
      message: e.response.data.message,
      error: e.message,
    };
  }

  return new DefaultApiError();
}
