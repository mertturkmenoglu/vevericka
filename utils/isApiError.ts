import { IError } from '../service/models/IError';

export function isApiError(e: any): e is IError {
  return (
    (e as IError).message !== undefined && (e as IError).status !== undefined && (e as IError).isError !== undefined
  );
}
