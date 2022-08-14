import { ApiError } from '.';

export class DefaultApiError implements ApiError {
  error = '';

  message = 'Cannot connect to service';

  statusCode = 500;
}
