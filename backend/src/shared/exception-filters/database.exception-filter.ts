import { ArgumentsHost, BadRequestException, Catch, NotFoundException } from '@nestjs/common';
import { EntityColumnNotFound } from 'typeorm/error/EntityColumnNotFound';
import { EntityNotFoundError } from 'typeorm/error/EntityNotFoundError';
import { QueryFailedError } from 'typeorm/error/QueryFailedError';
import { HttpExceptionFilter } from './http.exception-filter';

@Catch(EntityNotFoundError, EntityColumnNotFound, QueryFailedError)
export class DatabaseExceptionFilter extends HttpExceptionFilter {
  catch(exception: EntityNotFoundError | EntityColumnNotFound | QueryFailedError, host: ArgumentsHost) {
    if (exception instanceof EntityNotFoundError || exception instanceof EntityColumnNotFound) {
      return super.catch(new NotFoundException(exception.message, exception.name), host);
    } else {
      return super.catch(new BadRequestException(exception.message, exception.name), host);
    }
  }
}
