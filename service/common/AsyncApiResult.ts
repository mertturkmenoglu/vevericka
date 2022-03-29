import { ApiResult } from './ApiResult';

export type AsyncApiResult<T> = Promise<ApiResult<T>>;
