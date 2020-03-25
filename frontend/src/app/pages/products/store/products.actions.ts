import { createAction, props } from '@ngrx/store';
import { CreateProductDto, ProductDto, UpdateProductDto } from '../models/products.model';

export const GetProducts = createAction('[Products] Get Products');
export const GetProductsSuccess = createAction('[Products] Get Products Success', props<{ products: ProductDto[] }>());
export const SaveProduct = createAction('[Products] Save Product', props<{ createProductDto: CreateProductDto }>());
export const SaveProductSuccess = createAction('[Products] Save Product Success', props<{ product: ProductDto }>());
export const UpdateProduct = createAction('[Products] Update Product', props<{ id: string; updateProductDto: UpdateProductDto }>());
export const UpdateProductSuccess = createAction('[Products] Edit Update Success', props<{ product: ProductDto }>());
export const DeleteProduct = createAction('[Products] Delete Product', props<{ id: string }>());
export const DeleteProductSuccess = createAction('[Products] Delete Product Success', props<{ resId: number }>());
