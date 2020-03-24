import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';

import * as ProductsActions from './products.actions';
import { ProductsService } from '../services/products.service';

@Injectable()
export class ProductsEffects {
  getProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.GetProducts),
      mergeMap(() => this.productsService.fetchAllProducts().pipe(map(products => ProductsActions.GetProductsSuccess({ products })))),
    ),
  );

  constructor(private readonly actions$: Actions, private readonly productsService: ProductsService) {}
}
