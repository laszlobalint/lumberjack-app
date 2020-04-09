import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { isArray, isString } from 'util';
import { ErrorResponseBody, ValidationConstraint, ValidationError } from '../../models/api.model';

const TRACK_SUCCESS_FOR_METHODS = ['POST', 'PUT', 'DELETE'];
const TRACK_FAILURE_FOR_METHODS = ['GET', 'POST', 'PUT', 'DELETE'];
const URL_BLACKLIST = ['refresh-token', 'login', 'dashboard'];

@Injectable()
export class HttpResponseInterceptor implements HttpInterceptor {
  constructor(private readonly nbToastrService: NbToastrService, private readonly translateService: TranslateService) {}

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(event => {
        if (
          TRACK_SUCCESS_FOR_METHODS.includes(request.method) &&
          event instanceof HttpResponse &&
          URL_BLACKLIST.some(url => url.indexOf(request.url) < 0)
        ) {
          this.nbToastrService.success('', this.translateService.instant('validation.success'));
        }
      }),
      catchError((error: HttpErrorResponse) => {
        if (
          error instanceof HttpErrorResponse &&
          TRACK_FAILURE_FOR_METHODS.includes(request.method) &&
          error.error &&
          error.error.message
        ) {
          const { message }: ErrorResponseBody = error.error.message;
          if (isArray(message)) {
            this.getMessages(message as ValidationError[]).forEach(errorMsg =>
              this.nbToastrService.danger(errorMsg, this.translateService.instant('validation.failure')),
            );
          } else if (isString(message)) {
            this.nbToastrService.danger(message, this.translateService.instant('validation.failure'));
          }
        }

        throw error;
      }),
    );
  }

  private getMessages(validationErrors: ValidationError[]): string[] {
    const constraints: ValidationConstraint[] = validationErrors
      .map(error => this.getConstraints(error))
      .reduce((flat, next) => flat.concat(next, []));

    return constraints.map(constraint => Object.values(constraint)).reduce((flat, next) => flat.concat(next, []));
  }

  private getConstraints(validationError: ValidationError): ValidationConstraint[] {
    return [validationError.constraints].concat(...validationError.children.map(error => this.getConstraints(error)));
  }
}
