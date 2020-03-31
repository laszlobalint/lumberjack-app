import { InjectionToken } from '@angular/core';

export const SITE_NAME = 'Lumberjack';

export const API_URL = new InjectionToken('API_URL');

export const LANGUAGES = ['en', 'hu', 'sr'].map((language: string) => ({
  value: language,
  name: language.toUpperCase(),
}));
