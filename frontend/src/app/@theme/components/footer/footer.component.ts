import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { LANGUAGE_LOCAL_STORAGE_KEY } from '../../../app.constants';
import { LANGUAGE_OPTIONS, THEMES } from './../../theme.constants';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <div class="d-flex flex-column align-items-end w-100">
      <div class="d-block d-sm-none mb-2">
        <nb-select class="mr-2" [selected]="currentLanguage" (selectedChange)="changeLanguage($event)" status="basic" size="small">
          <nb-option *ngFor="let language of LANGUAGE_OPTIONS" [value]="language.value">{{ language.name }}</nb-option>
        </nb-select>
        <nb-select [selected]="currentTheme" (selectedChange)="changeTheme($event)" status="basic" size="small">
          <nb-option *ngFor="let theme of THEMES" [value]="theme.value"> {{ theme.name }}</nb-option>
        </nb-select>
      </div>
      <div class="subtitle">{{ today | date: 'yyyy. MM. dd. HH:mm:ss' }}</div>
    </div>
  `,
})
export class FooterComponent implements OnInit, OnDestroy {
  public readonly LANGUAGE_OPTIONS = LANGUAGE_OPTIONS;
  public readonly THEMES = THEMES;
  public today: Date = new Date();
  public currentLanguage = this.translateService.currentLang;
  public currentTheme = THEMES[0].value;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(public readonly translateService: TranslateService, private readonly themeService: NbThemeService) {
    setInterval(() => {
      this.today = new Date();
    }, 500);
  }

  public ngOnInit(): void {
    this.currentTheme = this.themeService.currentTheme;
    this.themeService
      .onThemeChange()
      .pipe(
        map(({ name }) => name),
        takeUntil(this.destroy$),
      )
      .subscribe(themeName => (this.currentTheme = themeName));
    this.translateService.onLangChange
      .pipe(
        map(({ lang }) => lang),
        takeUntil(this.destroy$),
      )
      .subscribe(lang => (this.currentLanguage = lang));
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public changeLanguage(selectedLanguage: string): void {
    this.translateService.use(selectedLanguage);
    localStorage.setItem(LANGUAGE_LOCAL_STORAGE_KEY, selectedLanguage);
  }

  public changeTheme(themeName: string): void {
    this.themeService.changeTheme(themeName);
  }
}
