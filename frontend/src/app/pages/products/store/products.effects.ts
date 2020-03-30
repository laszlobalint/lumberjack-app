import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';

import { ProductsService } from '../../../services/products.service';
import * as ProductsActions from './products.actions';

@Injectable()
export class ProductsEffects {
  getProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.GetProducts),
      mergeMap(({ load }) =>
        this.productsService.fetchAll().pipe(
          map(products => {
            load(products);
            return ProductsActions.GetProductsSuccess({ products });
          }),
        ),
      ),
    ),
  );

  saveProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.SaveProduct),
      mergeMap(({ createProductDto, confirm }) =>
        this.productsService.save(createProductDto).pipe(
          map(product => {
            confirm.resolve({ ...product, date: new Date() });
            return ProductsActions.SaveProductSuccess({ product });
          }),
        ),
      ),
    ),
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.UpdateProduct),
      mergeMap(({ id, updateProductDto, confirm }) =>
        this.productsService.update(id, updateProductDto).pipe(
          map(product => {
            confirm.resolve(product);
            return ProductsActions.UpdateProductSuccess({ product });
          }),
        ),
      ),
    ),
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsActions.DeleteProduct),
      mergeMap(({ id, confirm }) =>
        this.productsService.delete(id).pipe(
          map(resId => {
            confirm.resolve();
            return ProductsActions.DeleteProductSuccess({ resId });
          }),
        ),
      ),
    ),
  );

  constructor(private readonly actions$: Actions, private readonly productsService: ProductsService) {}
}
