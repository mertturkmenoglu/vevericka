import { ApiError } from './ApiError';

export class NotImplementedApiError implements ApiError {
  error = 'NotImplemented';

  message = 'Service function is not implemented';

  statusCode = 501;
}
