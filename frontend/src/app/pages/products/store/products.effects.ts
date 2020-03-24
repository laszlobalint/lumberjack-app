import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, switchMap } from 'rxjs/operators';

import * as ProductsActions from './products.actions';
import { ProductsService } from '../services/products.service';

@Injectable()
export class ProductsEffects {
  getProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.GetProducts),
      mergeMap(() => this.productsService.fetchAll().pipe(map(products => ProductsActions.GetProductsSuccess({ products })))),
    ),
  );

  saveProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.SaveProduct),
      switchMap(({ createProductDto }) =>
        this.productsService.save(createProductDto).pipe(map(product => ProductsActions.SaveProductSuccess({ product }))),
      ),
    ),
  );

  constructor(private readonly actions$: Actions, private readonly productsService: ProductsService) {}
}
