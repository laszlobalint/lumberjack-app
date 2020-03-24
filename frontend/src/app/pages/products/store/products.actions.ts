import { createAction, props } from '@ngrx/store';

import { Product, CreateProductDto } from '../models/products.model';

export const GetProducts = createAction('[Products] Get Products');
export const GetProductsSuccess = createAction('[Products] Get Products Success', props<{ products: Product[] }>());

export const SaveProduct = createAction('[Products] Save Product', props<{ createProductDto: CreateProductDto }>());
export const SaveProductSuccess = createAction('[Products] Save Product Success', props<{ product: Product }>());
