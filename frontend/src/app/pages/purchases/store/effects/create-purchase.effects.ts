import { Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { PurchasesService } from '../../../../services/purchases.service';
import * as CreatePurchaseActions from '../actions/create-purchase.actions';

@Injectable()
export class CreatePurchaseEffects {
  postPurchase$ = this.actions$.pipe(
    ofType(CreatePurchaseActions.PostPurchase),
    mergeMap(({ createPurchase }) =>
      this.purchasesService.postPurchase(createPurchase).pipe(map(purchase => CreatePurchaseActions.PostPurchaseSuccess({ purchase }))),
    ),
  );

  constructor(private readonly actions$: Actions, private readonly purchasesService: PurchasesService) {}
}
