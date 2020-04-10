import { CommonModule } from '@angular/common';
import { HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import {
  NbAuthJWTInterceptor,
  NbAuthJWTToken,
  NbAuthModule,
  NbPasswordAuthStrategy,
  NB_AUTH_TOKEN_INTERCEPTOR_FILTER,
} from '@nebular/auth';
import { NbRoleProvider, NbSecurityModule } from '@nebular/security';
import { Observable, of as observableOf } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthGuard } from './guards/auth.guard';
import { HttpResponseInterceptor } from './interceptors/http-response.interceptor';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { AnalyticsService } from './utils';

export class NbSimpleRoleProvider extends NbRoleProvider {
  public getRole(): Observable<string> {
    return observableOf('guest');
  }
}

export const NB_CORE_PROVIDERS = [
  ...NbAuthModule.forRoot({
    strategies: [
      NbPasswordAuthStrategy.setup({
        name: 'email',
        baseEndpoint: environment.apiUrl,
        token: {
          class: NbAuthJWTToken,
          key: 'access_token',
        },
        login: {
          endpoint: '/auth/login',
          method: 'post',
          redirect: {
            success: '/pages',
            failure: '/auth/login',
          },
        },
        logout: {
          endpoint: '/auth/logout',
          method: 'post',
          redirect: {
            success: '/pages',
            failure: '/auth/login',
          },
        },
        refreshToken: {
          endpoint: '/auth/refresh-token',
          method: 'post',
          requireValidToken: true,
          redirect: {
            success: null,
            failure: null,
          },
        },
        register: false,
      }),
    ],
    forms: {
      login: {
        strategy: 'email',
        rememberMe: false,
      },
      register: {},
      logout: {
        strategy: 'email',
      },
    },
  }).providers,

  NbSecurityModule.forRoot({
    accessControl: {
      guest: {
        view: '*',
      },
      user: {
        parent: 'guest',
        create: '*',
        edit: '*',
        remove: '*',
      },
    },
  }).providers,

  {
    provide: NbRoleProvider,
    useClass: NbSimpleRoleProvider,
  },
  AnalyticsService,
];

export function nbAuthTokenInterceptorFilter(req: HttpRequest<any>) {
  const blacklist = ['/auth/login', '/auth/refresh-token'];
  return blacklist.some(path => req.url.search(path) > -1);
}

@NgModule({
  imports: [CommonModule],
  exports: [NbAuthModule],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
        { provide: HTTP_INTERCEPTORS, useClass: HttpResponseInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: NbAuthJWTInterceptor, multi: true },
        {
          provide: NB_AUTH_TOKEN_INTERCEPTOR_FILTER,
          useValue: nbAuthTokenInterceptorFilter,
        },
        AuthGuard,
      ],
    } as ModuleWithProviders;
  }
}
