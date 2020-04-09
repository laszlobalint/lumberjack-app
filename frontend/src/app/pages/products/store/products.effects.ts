import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
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
            confirm.resolve(product);
            return ProductsActions.SaveProductSuccess({ product });
          }),
          catchError(_ => {
            confirm.reject();
            return of(ProductsActions.SaveProductFailure());
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
          catchError(_ => {
            confirm.reject();
            return of(ProductsActions.UpdateProductFailure());
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
          catchError(_ => {
            confirm.reject();
            return of(ProductsActions.DeleteProductFailure());
          }),
        ),
      ),
    ),
  );

  constructor(private readonly actions$: Actions, private readonly productsService: ProductsService) {}
}
