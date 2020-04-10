import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getDeepFromObject, NbAuthResult, NbAuthService, NbTokenService, NB_AUTH_OPTIONS } from '@nebular/auth';
import { Store } from '@ngrx/store';
import * as fromAuth from '../../store';

@Component({
  selector: 'ngx-logout',
  template: `
    <div>{{ 'user.logout' | translate }}</div>
  `,
})
export class LogoutComponent implements OnInit {
  public redirectDelay: number = 0;
  public strategy: string = '';

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

  public ngOnInit(): void {
    this.logout(this.strategy);
  }

  public logout(strategy: string): void {
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

  public getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }
}
