import { createAction, props } from '@ngrx/store';

import { Product } from '../models/products.model';

export const GetProducts = createAction('[Products] Get Products');
export const GetProductsSuccess = createAction('[Products] Get Products Success', props<{ products: Product[] }>());

export const SaveProduct = createAction('[Products] Save Product', props<{ product: Product }>());
export const SaveProductSuccess = createAction('[Products] Save Product Success', props<{ message: string }>());
