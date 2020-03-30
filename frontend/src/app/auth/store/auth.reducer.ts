import { Action, createReducer, on } from '@ngrx/store';

import { UserDto } from '../models/user.model';
import * as AuthActions from './auth.actions';

interface AuthState {
  user?: UserDto;
  language?: string;
}

export const initialState: AuthState = {
  user: undefined,
  language: undefined,
};

const authReducer = createReducer(
  initialState,
  on(AuthActions.GetUserSuccess, AuthActions.SetUser, (state, { user, browserLanguage }) => ({
    ...state,
    user,
    language: browserLanguage,
  })),
  on(AuthActions.SetLanguage, (state, { language }) => ({
    ...state,
    language,
  })),
);

export interface State {
  auth: AuthState;
}

export const authFeatureKey = 'auth';

export function reducer(state: AuthState | undefined, action: Action) {
  return authReducer(state, action);
}
