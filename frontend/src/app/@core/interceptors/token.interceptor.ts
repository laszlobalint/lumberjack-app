import { NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NbAuthService } from '@nebular/auth';
import { Observable, of } from 'rxjs';
import { switchMap, catchError, first, flatMap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

import { environment } from './../../../environments/environment.prod';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private readonly nbAuthService: NbAuthService,
    private readonly router: Router,
    private readonly translateService: TranslateService,
    private readonly nbToastrService: NbToastrService,
  ) {}
  private readonly LOGIN_URL = `${environment.apiUrl}/auth/login`;

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return this.nbAuthService.isAuthenticated().pipe(
      switchMap(authenticated => {
        if (authenticated) {
          return this.nbAuthService.getToken().pipe(
            first(),
            flatMap((token: any) => {
              const JWT = `Bearer ${token.getValue()}`;
              request = request.clone({
                setHeaders: {
                  Authorization: JWT,
                },
              });
              return next.handle(request);
            }),
          );
        } else {
          return next.handle(request).pipe(
            catchError((error, caught) => {
              if (error.status === 401 && this.router.url !== this.LOGIN_URL) {
                this.nbToastrService.warning('', this.translateService.instant('global.expired'), { duration: 5000 });
                setTimeout(() => {
                  this.router.navigateByUrl(this.LOGIN_URL);
                }, 5000);
                return of(error);
              }
              throw error;
            }),
          );
        }
      }),
    );
  }
}
