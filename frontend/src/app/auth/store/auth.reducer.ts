import { Action, createReducer, on } from '@ngrx/store';
import { UserDto } from '../models/user.model';
import { RootState } from './../../store/index';
import * as AuthActions from './auth.actions';

export interface AuthState {
  user?: UserDto;
}

export const initialState: AuthState = {
  user: undefined,
};

const authReducer = createReducer(
  initialState,
  on(AuthActions.GetUserSuccess, AuthActions.SetUser, (state, { user }) => ({
    ...state,
    user,
  })),
);

export interface State extends RootState {
  user: AuthState;
}

export const userFeatureKey = 'auth';

export function reducer(state: AuthState | undefined, action: Action) {
  return authReducer(state, action);
}
