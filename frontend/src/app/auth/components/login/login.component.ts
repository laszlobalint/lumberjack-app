import { ChangeDetectorRef, Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { getDeepFromObject, NbAuthResult, NbAuthService, NB_AUTH_OPTIONS } from '@nebular/auth';
import { Store } from '@ngrx/store';

import * as fromAuth from '../../store';
import { LoginResponseDto } from '../../models/login.model';
import { TranslateService } from '@ngx-translate/core';
import { LANGUAGES } from '../../../@theme/components/header/header.constants';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private readonly LANGUAGES = LANGUAGES;
  public browserLanguage?: string;
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
    private readonly store: Store<fromAuth.State>,
    private readonly translateService: TranslateService,
  ) {
    this.redirectDelay = this.getConfigValue('forms.login.redirectDelay');
    this.showMessages = this.getConfigValue('forms.login.showMessages');
    this.strategy = this.getConfigValue('forms.login.strategy');
    this.browserLanguage = this.translateService.getBrowserLang();
    this.LANGUAGES.some(l => l.value === this.browserLanguage)
      ? this.translateService.setDefaultLang(this.browserLanguage)
      : this.translateService.setDefaultLang(this.LANGUAGES[0].value);
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

        this.store.dispatch(fromAuth.SetUser({ user, browserLanguage: this.browserLanguage }));
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
