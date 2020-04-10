import { LANGUAGES } from '../app.constants';

export const THEMES = [
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
  {
    value: 'corporate',
    name: 'Corporate',
  },
];

export const LANGUAGE_OPTIONS = LANGUAGES.map((language: string) => ({
  value: language,
  name: language.toUpperCase(),
}));
