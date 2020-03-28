import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
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
      mergeMap(({ id, updatePurchase }) =>
        this.purchasesService.update(id, updatePurchase).pipe(map(purchase => PurchasesActions.UpdatePurchaseSuccess({ purchase }))),
      ),
    ),
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PurchasesActions.DeletePurchase),
      mergeMap(({ id }) => this.purchasesService.delete(id).pipe(map(resId => PurchasesActions.DeletePurchaseSuccess({ resId })))),
    ),
  );

  constructor(private readonly actions$: Actions, private readonly purchasesService: PurchasesService) {}
}
