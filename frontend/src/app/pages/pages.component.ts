import { Component, OnDestroy } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { getMenuItems } from './pages-menu.contants';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="MENU_ITEMS"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnDestroy {
  public MENU_ITEMS: NbMenuItem[];
  private languageSubscription: Subscription;

  constructor(public readonly translate: TranslateService) {
    this.MENU_ITEMS = getMenuItems(translate);
    this.languageSubscription = this.translate.onLangChange.subscribe(() => {
      this.MENU_ITEMS = getMenuItems(translate);
    });
  }

  public ngOnDestroy(): void {
    this.languageSubscription.unsubscribe();
  }
}
