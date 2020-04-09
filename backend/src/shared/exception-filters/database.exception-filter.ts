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
      const errorCode = (exception as any).code;
      if (errorCode === 'ER_ROW_IS_REFERENCED' || errorCode === 'ER_ROW_IS_REFERENCED_2') {
        return super.catch(new BadRequestException("Can't delete because it has related purchases.", exception.name), host);
      }

      return super.catch(new BadRequestException(exception.message, exception.name), host);
    }
  }
}
