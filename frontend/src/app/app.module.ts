import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgModule, Injector, APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbChatModule,
  NbDatepickerModule,
  NbDialogModule,
  NbLayoutModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import { LOCATION_INITIALIZED } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { CustomersService, ProductsService, PurchasesService } from './services';
import { AppComponent } from './app.component';
import { LANGUAGES } from './app.constants';

export function appInitializerFactory(translate: TranslateService, injector: Injector): () => Promise<any> {
  return () =>
    new Promise<any>((resolve: any) => {
      const locationInitialized = injector.get(LOCATION_INITIALIZED, Promise.resolve(null));
      locationInitialized.then(() => {
        const browserLanguage = translate.getBrowserLang().toLowerCase();
        const storedLanguage = localStorage.getItem('language');
        const setLangArgument = { translate, resolve };

        if (!storedLanguage && LANGUAGES.some(l => l.value === browserLanguage)) {
          setLanguageSettings({ ...setLangArgument, language: browserLanguage });
        } else if (storedLanguage) {
          setLanguageSettings({ ...setLangArgument, language: storedLanguage.toLowerCase() });
        } else {
          setLanguageSettings({ ...setLangArgument, language: LANGUAGES[0].value });
        }
      });
    });
}

function setLanguageSettings(props: any): void {
  props.translate.setDefaultLang(props.language);
  localStorage.setItem('language', props.language);
  props.resolve(null);
}

export function HttpLoaderFactory(httpClient: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(httpClient, 'assets/i18n/', '.json');
}

const NB_MODULES = [
  NbSidebarModule.forRoot(),
  NbMenuModule.forRoot(),
  NbDatepickerModule.forRoot(),
  NbDialogModule.forRoot(),
  NbWindowModule.forRoot(),
  NbToastrModule.forRoot(),
  NbLayoutModule,
  NbChatModule.forRoot({
    messageGoogleMapKey: 'AIzaSyA_wNuCzia92MAmdLRzmqitRGvCF7wCZPY',
  }),
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    ThemeModule.forRoot(),
    ...NB_MODULES,
    CoreModule.forRoot(),
    AuthModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    TranslateService,
    CustomersService,
    ProductsService,
    PurchasesService,
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
