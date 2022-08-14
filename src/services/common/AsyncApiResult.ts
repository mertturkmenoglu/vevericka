import { ApiResult } from '.';

export type AsyncApiResult<T> = Promise<ApiResult<T>>;
