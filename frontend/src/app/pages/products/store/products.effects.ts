import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, switchMap } from 'rxjs/operators';

import { ProductsService } from '../services/products.service';
import * as ProductsActions from './products.actions';

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

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.UpdateProduct),
      switchMap(({ id, updateProductDto }) =>
        this.productsService.update(id, updateProductDto).pipe(map(product => ProductsActions.UpdateProductSuccess({ product }))),
      ),
    ),
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.DeleteProduct),
      mergeMap(({ id }) => this.productsService.delete(id).pipe(map(resId => ProductsActions.DeleteProductSuccess({ resId })))),
    ),
  );

  constructor(private readonly actions$: Actions, private readonly productsService: ProductsService) {}
}
