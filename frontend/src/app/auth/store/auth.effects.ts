import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.GetUser),
      mergeMap(() =>
        this.authService.getUser().pipe(
          map(user => {
            return AuthActions.GetUserSuccess({ user });
          }),
        ),
      ),
    ),
  );

  constructor(private readonly actions$: Actions, private readonly authService: AuthService) {}
}
