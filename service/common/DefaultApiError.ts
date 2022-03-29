import { ApiError } from './ApiError';

export class DefaultApiError implements ApiError {
  error = '';

  message = 'Cannot connect to service';

  statusCode = 500;
}
