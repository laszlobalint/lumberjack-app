import { createAction, props } from '@ngrx/store';
import { CreatePurchaseDto, ProductDto, PurchaseDto } from '../../../../models';
import { CustomerDto } from '../../../../models/customers.model';

export const PostPurchase = createAction('[Purchase] Post Purchase', props<{ createPurchase: CreatePurchaseDto }>());
export const PostPurchaseSuccess = createAction('[Purchase] Post Purchase Success', props<{ purchase: PurchaseDto }>());
export const PostPurchaseFailure = createAction('[Purchase] Post Purchase Failure');
export const GetProducts = createAction('[Purchase] Get Products');
export const GetProductsSuccess = createAction('[Purchase] Get Products Success', props<{ products: ProductDto[] }>());
export const GetCustomers = createAction('[Purchase] Get Customers');
export const GetCustomersSuccess = createAction('[Purchase] Get Customers Success', props<{ customers: CustomerDto[] }>());
