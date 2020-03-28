import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu.contants';

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
  public readonly MENU_ITEMS = MENU_ITEMS;
}
