import { ArgumentsHost, Catch, NotFoundException } from '@nestjs/common';
import { EntityColumnNotFound } from 'typeorm/error/EntityColumnNotFound';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { HttpExceptionFilter } from './http.exception-filter';

@Catch(EntityNotFoundError, EntityColumnNotFound)
export class DatabaseExceptionFilter extends HttpExceptionFilter {
  catch(exception: EntityNotFoundError | EntityColumnNotFound, host: ArgumentsHost) {
    return super.catch(new NotFoundException(exception.message, exception.name), host);
  }
}
