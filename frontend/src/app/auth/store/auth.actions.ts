import { createAction, props } from '@ngrx/store';

import { UserDto } from '../models/user.model';

export const GetUser = createAction('[Auth] Get User');
export const GetUserSuccess = createAction('[Auth] Get User Success', props<{ user: UserDto; browserLanguage: string }>());
export const SetUser = createAction('[Auth] Set User', props<{ user: UserDto | undefined; browserLanguage: string }>());
export const SetLanguage = createAction('[Auth] Set Language', props<{ language: string }>());
