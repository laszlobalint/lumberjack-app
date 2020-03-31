import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromAuth from '../../../auth/store';
import { UserDto } from '../../../auth/models/user.model';
import { THEMES } from './header.constants';
import { LANGUAGES, SITE_NAME } from '../../../app.constants';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  public readonly SITE_NAME = SITE_NAME;
  public readonly LANGUAGES = LANGUAGES;
  public readonly THEMES = THEMES;
  public currentTheme = THEMES[0].value;
  public currentLanguage = localStorage.getItem('language') ? localStorage.getItem('language') : LANGUAGES[0].value;
  public user?: UserDto;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private readonly menuService: NbMenuService,
    private readonly sidebarService: NbSidebarService,
    private readonly themeService: NbThemeService,
    private readonly authStore: Store<fromAuth.State>,
    public readonly translate: TranslateService,
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

  public changeLanguage(value: string): void {
    this.currentLanguage = value;
    this.translate.use(this.currentLanguage);
    localStorage.setItem('language', value);
  }
}
