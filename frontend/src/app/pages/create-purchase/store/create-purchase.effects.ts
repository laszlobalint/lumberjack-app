import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { CustomersService } from '../../../services/customers.service';
import { ProductsService } from '../../../services/products.service';
import { PurchasesService } from '../../../services/purchases.service';
import * as CreatePurchaseActions from './create-purchase.actions';

@Injectable()
export class CreatePurchaseEffects {
  postPurchase$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreatePurchaseActions.PostPurchase),
      mergeMap(({ createPurchase }) =>
        this.purchasesService.save(createPurchase).pipe(
          map(purchase => CreatePurchaseActions.PostPurchaseSuccess({ purchase })),
          catchError(error => of(CreatePurchaseActions.PostPurchaseFailure())),
        ),
      ),
    ),
  );

  getProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreatePurchaseActions.GetProducts),
      mergeMap(() => this.productsService.fetchAll().pipe(map(products => CreatePurchaseActions.GetProductsSuccess({ products })))),
    ),
  );

  getCustomers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreatePurchaseActions.GetCustomers),
      mergeMap(() => this.customersService.fetchAll().pipe(map(customers => CreatePurchaseActions.GetCustomersSuccess({ customers })))),
    ),
  );

  constructor(
    private readonly actions$: Actions,
    private readonly purchasesService: PurchasesService,
    private readonly customersService: CustomersService,
    private readonly productsService: ProductsService,
  ) {}
}
