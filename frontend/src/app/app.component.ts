import { Component, OnInit } from '@angular/core';
import { NbAuthService } from '@nebular/auth';
import { Store } from '@ngrx/store';
import * as fromAuth from './auth/store';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  constructor(private readonly NbAuthService: NbAuthService, private readonly authStore: Store<fromAuth.State>) {}

  async ngOnInit() {
    const nbAuthToken = await this.NbAuthService.getToken().toPromise();
    if (nbAuthToken) {
      this.authStore.dispatch(fromAuth.GetUser());
    }
  }
}
