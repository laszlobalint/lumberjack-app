import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { LANGUAGE_LOCAL_STORAGE_KEY, SITE_NAME } from '../../../app.constants';
import { UserDto } from '../../../auth/models/user.model';
import * as fromAuth from '../../../auth/store';
import * as fromRoot from '../../../store';
import { LANGUAGE_OPTIONS, THEMES } from './../../theme.constants';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  public readonly SITE_NAME = SITE_NAME;
  public readonly LANGUAGE_OPTIONS = LANGUAGE_OPTIONS;
  public readonly THEMES = THEMES;
  public currentTheme = THEMES[0].value;
  public currentLanguage = this.translateService.currentLang;
  public user?: UserDto;

  public uncompletedPurchasesForTomorrow$ = this.rootStore
    .select('feed')
    .pipe(map(feed => (feed.feed && feed.feed.uncompletedPurchasesForTomorrow) || []));
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private readonly menuService: NbMenuService,
    private readonly sidebarService: NbSidebarService,
    private readonly themeService: NbThemeService,
    private readonly authStore: Store<fromAuth.State>,
    private readonly rootStore: Store<fromRoot.State>,
    public readonly translateService: TranslateService,
  ) {}

  public ngOnInit(): void {
    this.currentTheme = this.themeService.currentTheme;
    this.authStore.select('auth').subscribe(state => {
      this.user = state.user;
    });
    this.translateService.onLangChange
      .pipe(
        map(({ lang }) => lang),
        takeUntil(this.destroy$),
      )
      .subscribe(lang => (this.currentLanguage = lang));
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

  public toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  public navigateHome(): boolean {
    this.menuService.navigateHome();
    return false;
  }

  public changeLanguage(selectedLanguage: string): void {
    this.translateService.use(selectedLanguage);
    localStorage.setItem(LANGUAGE_LOCAL_STORAGE_KEY, selectedLanguage);
  }

  public changeTheme(themeName: string): void {
    this.themeService.changeTheme(themeName);
  }
}
