import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getDeepFromObject, NbAuthResult, NbAuthService, NbTokenService, NB_AUTH_OPTIONS } from '@nebular/auth';

/*
  This is a modified implementation of: https://github.com/akveo/nebular/blob/master/src/framework/auth/components/logout/logout.component.html
*/

@Component({
  selector: 'logout',
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
