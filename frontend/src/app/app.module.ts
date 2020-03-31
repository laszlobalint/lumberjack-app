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
import { LANGUAGES } from './@theme/components/header/header.constants';

export function appInitializerFactory(translate: TranslateService, injector: Injector) {
  return () =>
    new Promise<any>((resolve: any) => {
      const locationInitialized = injector.get(LOCATION_INITIALIZED, Promise.resolve(null));
      locationInitialized.then(() => {
        let language: string;
        LANGUAGES.some(l => l.value === translate.getBrowserLang()) ? (language = translate.getBrowserLang()) : (language = 'en');
        translate.setDefaultLang(language);
        translate.use(language).subscribe(
          () => {
            console.info(`Successfully initialized '${language}' language.`);
          },
          err => {
            console.error(`Problem with '${language}' language initialization.`);
          },
          () => {
            resolve(null);
          },
        );
      });
    });
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
