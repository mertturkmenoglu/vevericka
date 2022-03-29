import { ApiError } from './ApiError';

export interface ApiResult<T> {
  data?: T;
  exception?: ApiError;
}
