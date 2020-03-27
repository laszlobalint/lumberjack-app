import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMenuItem, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

import * as fromAuth from '../../../auth/store';
import { AuthService } from '../../../auth/services/auth.service';
import { UserDto } from '../../../auth/models/user.model';
import { SITE_NAME } from './../../../constants';
import { Store } from '@ngrx/store';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();
  public user?: UserDto;
  public userMenu: NbMenuItem[] = [{ title: 'Logout', link: '/auth/logout' }];
  public readonly SITE_NAME = SITE_NAME;
  public currentTheme = 'default';
  public readonly THEMES = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
  ];

  constructor(
    private readonly authService: AuthService,
    private readonly menuService: NbMenuService,
    private readonly sidebarService: NbSidebarService,
    private readonly themeService: NbThemeService,
    private readonly authStore: Store<fromAuth.State>,
  ) {}

  public ngOnInit(): void {
    this.currentTheme = this.themeService.currentTheme;
    this.authStore.select('auth').subscribe(state => {
      this.user = state.user;
    });
    this.themeService
      .onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => (this.currentTheme = themeName));
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public changeTheme(themeName: string): void {
    this.themeService.changeTheme(themeName);
  }

  public toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  public navigateHome(): boolean {
    this.menuService.navigateHome();
    return false;
  }
}
