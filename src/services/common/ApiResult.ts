import { ApiError } from '.';

export interface ApiResult<T> {
  data?: T;
  exception?: ApiError;
}
