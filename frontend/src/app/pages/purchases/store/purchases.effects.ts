import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as PurchasesActions from '../store/purchases.actions';
import { PurchasesService } from './../../../services/purchases.service';

@Injectable()
export class PurchasesEffects {
  getPurchases$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PurchasesActions.GetPurchases),
      mergeMap(() => this.purchasesService.fetchAll().pipe(map(purchases => PurchasesActions.GetPurchasesSuccess({ purchases })))),
    ),
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PurchasesActions.UpdatePurchase),
      mergeMap(({ id, updatePurchase, confirm }) =>
        this.purchasesService.update(id, updatePurchase).pipe(
          map(purchase => {
            confirm.resolve(purchase);
            return PurchasesActions.UpdatePurchaseSuccess({ purchase });
          }),
          catchError(() => {
            return of(PurchasesActions.UpdatePurchaseFailure);
          }),
        ),
      ),
    ),
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PurchasesActions.DeletePurchase),
      mergeMap(({ id, confirm }) =>
        this.purchasesService.delete(id).pipe(
          map(resId => {
            confirm.resolve();
            return PurchasesActions.DeletePurchaseSuccess({ resId });
          }),
          catchError(() => {
            return of(PurchasesActions.DeletePurchaseFailure);
          }),
        ),
      ),
    ),
  );

  constructor(private readonly actions$: Actions, private readonly purchasesService: PurchasesService) {}
}
