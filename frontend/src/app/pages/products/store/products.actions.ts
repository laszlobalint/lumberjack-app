import { createAction, props } from '@ngrx/store';

import { CreateProductDto, ProductDto, UpdateProductDto } from '../../../models/products.model';
import { SmartTableConfirm } from '../../../helpers/ng2-smart-table/ng2-smart-table.model';

export const GetProducts = createAction('[Products] Get Products', props<{ load: (products: ProductDto[]) => any }>());
export const GetProductsSuccess = createAction('[Products] Get Products Success', props<{ products: ProductDto[] }>());
export const SaveProduct = createAction(
  '[Products] Save Product',
  props<{ createProductDto: CreateProductDto; confirm: SmartTableConfirm<ProductDto> }>(),
);
export const SaveProductSuccess = createAction('[Products] Save Product Success', props<{ product: ProductDto }>());
export const UpdateProduct = createAction(
  '[Products] Update Product',
  props<{ id: string; updateProductDto: UpdateProductDto; confirm: SmartTableConfirm<ProductDto> }>(),
);
export const UpdateProductSuccess = createAction('[Products] Update Product Success', props<{ product: ProductDto }>());
export const DeleteProduct = createAction('[Products] Delete Product', props<{ id: string; confirm: SmartTableConfirm<ProductDto> }>());
export const DeleteProductSuccess = createAction('[Products] Delete Product Success', props<{ resId: number }>());
