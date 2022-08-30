import axios from 'axios';
import { ApiError, DefaultApiError } from '.';

export function handleApiError(e: unknown): ApiError {
  if (axios.isAxiosError(e) && e.response) {
    const err = e as any;
    return {
      statusCode: err.response.status,
      message: err.response.data.message,
      error: err.message,
    };
  }

  return new DefaultApiError();
}
