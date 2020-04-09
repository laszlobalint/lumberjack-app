import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as fromRoot from '../../../store';
import * as fromActions from '../store/purchases.actions';
import { PurchasesService } from './../../../services/purchases.service';

@Injectable()
export class PurchasesEffects {
  getPurchases$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.GetPurchases),
      mergeMap(({ load }) =>
        this.purchasesService.fetchAll().pipe(
          map(purchases => {
            load(purchases);
            return fromActions.GetPurchasesSuccess({ purchases });
          }),
        ),
      ),
    ),
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.UpdatePurchase),
      mergeMap(({ id, updatePurchase, confirm }) =>
        this.purchasesService.update(id, updatePurchase).pipe(
          map(purchase => {
            confirm.resolve(purchase);
            return fromActions.UpdatePurchaseSuccess({ purchase });
          }),
          catchError(() => {
            confirm.reject();
            return of(fromActions.UpdatePurchaseFailure);
          }),
        ),
      ),
    ),
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.DeletePurchase),
      mergeMap(({ id, confirm }) =>
        this.purchasesService.delete(id).pipe(
          map(resId => {
            confirm.resolve();
            return fromActions.DeletePurchaseSuccess({ resId });
          }),
          catchError(() => {
            confirm.reject();
            return of(fromActions.DeletePurchaseFailure);
          }),
        ),
      ),
    ),
  );

  onPurchasesChanged$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.GetPurchasesSuccess, fromActions.UpdatePurchaseSuccess, fromActions.DeletePurchaseSuccess),
      map(() => fromRoot.GetFeed()),
    ),
  );

  constructor(private readonly actions$: Actions, private readonly purchasesService: PurchasesService) {}
}
