import { Component } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { NbMenuItem } from '@nebular/theme';

import { translateMenuItems } from './pages-menu.contants';

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
export class PagesComponent {
  public MENU_ITEMS: NbMenuItem[];

  constructor(public readonly translate: TranslateService) {
    this.MENU_ITEMS = translateMenuItems(translate);
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.MENU_ITEMS = translateMenuItems(translate);
    });
  }
}
