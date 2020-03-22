import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getDeepFromObject, NbAuthResult, NbAuthService, NbTokenService, NB_AUTH_OPTIONS } from '@nebular/auth';
import { Store } from '@ngrx/store';
import * as fromAuth from '../../store';

/*
  This is a modified implementation of:
  https://github.com/akveo/nebular/blob/master/src/framework/auth/components/logout/logout.component.html
*/

@Component({
  selector: 'ngx-logout',
  template: `
    <div>Logging out, please wait...</div>
  `,
})
export class LogoutComponent implements OnInit {
  redirectDelay: number = 0;
  strategy: string = '';

  constructor(
    protected nbAuthService: NbAuthService,
    protected nbTokenService: NbTokenService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected router: Router,
    private readonly store: Store<fromAuth.State>,
  ) {
    this.redirectDelay = this.getConfigValue('forms.logout.redirectDelay');
    this.strategy = this.getConfigValue('forms.logout.strategy');
  }

  ngOnInit(): void {
    this.logout(this.strategy);
  }

  logout(strategy: string): void {
    this.nbAuthService.logout(strategy).subscribe((result: NbAuthResult) => {
      this.nbTokenService.clear();
      this.store.dispatch(fromAuth.SetUser({ user: undefined }));

      const redirect = result.getRedirect();
      if (redirect) {
        setTimeout(() => {
          return this.router.navigateByUrl(redirect);
        }, this.redirectDelay);
      }
    });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }
}
