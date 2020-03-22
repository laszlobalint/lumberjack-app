import { createAction, props } from '@ngrx/store';
import { UserDto } from '../models/user.model';

export const GetUser = createAction('[Auth] Get User');
export const GetUserSuccess = createAction('[Auth] Get User Success', props<{ user: UserDto }>());
export const SetUser = createAction('[Auth] Set User', props<{ user: UserDto | undefined }>());
