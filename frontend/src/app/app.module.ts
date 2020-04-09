import { LOCATION_INITIALIZED } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbDatepickerModule,
  NbDialogModule,
  NbLayoutModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { from, Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LANGUAGES, LANGUAGE_LOCAL_STORAGE_KEY } from './app.constants';
import { AuthModule } from './auth/auth.module';
import { CustomersService, FeedService, ProductsService, PurchasesService } from './services';
import { effects, reducers } from './store';

export function appInitializerFactory(translate: TranslateService, injector: Injector): () => Promise<any> {
  return async () => {
    await injector.get(LOCATION_INITIALIZED, Promise.resolve(null));
    const storedLanguage = localStorage.getItem(LANGUAGE_LOCAL_STORAGE_KEY);
    const browserLanguage = translate.getBrowserLang().toLowerCase();
    translate.use(storedLanguage || (LANGUAGES.includes(browserLanguage) && browserLanguage) || LANGUAGES[0]);
    return null;
  };
}

export class WebpackTranslateLoader implements TranslateLoader {
  public getTranslation(lang: string): Observable<any> {
    return from(import(`../assets/i18n/${lang}.json`));
  }
}

const NB_MODULES = [
  NbSidebarModule.forRoot(),
  NbMenuModule.forRoot(),
  NbDatepickerModule.forRoot(),
  NbDialogModule.forRoot(),
  NbWindowModule.forRoot(),
  NbToastrModule.forRoot(),
  NbLayoutModule,
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictStateImmutability: false,
        strictActionImmutability: false,
      },
    }),
    EffectsModule.forRoot(effects),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    ThemeModule.forRoot(),
    ...NB_MODULES,
    CoreModule.forRoot(),
    AuthModule,
    TranslateModule.forRoot({
      defaultLanguage: LANGUAGES[0],
      loader: {
        provide: TranslateLoader,
        useClass: WebpackTranslateLoader,
      },
    }),
  ],
  providers: [
    TranslateService,
    CustomersService,
    ProductsService,
    PurchasesService,
    FeedService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [TranslateService, Injector],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
