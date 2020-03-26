import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { CustomersService } from '../../../../services/customers.service';
import { ProductsService } from '../../../../services/products.service';
import { PurchasesService } from '../../../../services/purchases.service';
import * as CreatePurchaseActions from '../actions/create-purchase.actions';

@Injectable()
export class CreatePurchaseEffects {
  postPurchase$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreatePurchaseActions.PostPurchase),
      mergeMap(({ createPurchase }) =>
        this.purchasesService.postPurchase(createPurchase).pipe(map(purchase => CreatePurchaseActions.PostPurchaseSuccess({ purchase }))),
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
