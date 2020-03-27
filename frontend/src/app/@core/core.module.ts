import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { NbAuthJWTToken, NbAuthModule, NbPasswordAuthStrategy } from '@nebular/auth';
import { NbRoleProvider, NbSecurityModule } from '@nebular/security';
import { of as observableOf, Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { AuthGuard } from './guards/auth.guard';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { TokenInterceptor } from './interceptors/token.interceptor';
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
      providers: [...NB_CORE_PROVIDERS, { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }, AuthGuard],
    } as ModuleWithProviders;
  }
}
