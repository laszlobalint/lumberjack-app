import { Component, OnInit } from '@angular/core';
import { NbAuthService } from '@nebular/auth';
import { Store } from '@ngrx/store';
import { filter, map } from 'rxjs/operators';
import * as fromAuth from './auth/store';
import * as fromRoot from './store';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  constructor(
    private readonly nbAuthService: NbAuthService,
    private readonly authStore: Store<fromAuth.State>,
    private readonly rootStore: Store<fromRoot.State>,
  ) {}

  public async ngOnInit(): Promise<void> {
    const nbAuthToken = await this.nbAuthService.getToken().toPromise();
    if (nbAuthToken && nbAuthToken.isValid()) {
      this.authStore.dispatch(fromAuth.GetUser());
    }

    this.authStore
      .select('auth')
      .pipe(
        map(state => state.user),
        filter(user => !!user),
      )
      .subscribe(() => {
        this.rootStore.dispatch(fromRoot.GetFeed());
      });
  }
}
