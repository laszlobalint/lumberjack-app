import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getDeepFromObject, NbAuthResult, NbAuthService, NB_AUTH_OPTIONS } from '@nebular/auth';
import * as fromAuth from '../../../auth/store';
import { LoginResponseDto } from '../../models/login.model';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  public?: string;
  public redirectDelay: number = 0;
  public showMessages: any = {};
  public strategy: string = '';
  public errors: string[] = [];
  public messages: string[] = [];
  public user: any = {};
  public submitted: boolean = false;

  constructor(
    private readonly service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) private readonly options = {},
    private readonly cd: ChangeDetectorRef,
    private readonly router: Router,
    private readonly authStore: Store<fromAuth.State>,
  ) {
    this.redirectDelay = this.getConfigValue('forms.login.redirectDelay');
    this.showMessages = this.getConfigValue('forms.login.showMessages');
    this.strategy = this.getConfigValue('forms.login.strategy');
  }

  public login(): void {
    this.errors = [];
    this.messages = [];
    this.submitted = true;

    this.service.authenticate(this.strategy, this.user).subscribe((result: NbAuthResult) => {
      this.submitted = false;

      if (result.isSuccess()) {
        this.messages = result.getMessages();
        const { user }: LoginResponseDto = result.getResponse().body;
        this.authStore.dispatch(fromAuth.SetUser({ user }));
      } else {
        this.errors = result.getErrors();
      }

      const redirect = result.getRedirect();
      if (redirect) {
        setTimeout(() => {
          return this.router.navigateByUrl(redirect);
        }, this.redirectDelay);
      }
      this.cd.detectChanges();
    });
  }

  public getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }
}
