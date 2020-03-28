import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NbAuthService } from '@nebular/auth';
import { Observable } from 'rxjs';
import { first, flatMap } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private readonly nbAuthService: NbAuthService) {}

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.nbAuthService.getToken().pipe(
      first(),
      flatMap(token => {
        const value = token.getValue();
        if (value) {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${value}`,
            },
          });
        }
        return next.handle(request);
      }),
    );
  }
}
