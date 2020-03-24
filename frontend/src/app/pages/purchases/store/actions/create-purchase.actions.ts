import { createAction, props } from '@ngrx/store';
import { CreatePurchaseDto, PurchaseDto } from './../../models/purchases.model';

export const PostPurchase = createAction('[Purchase] Post Purchase', props<{ createPurchase: CreatePurchaseDto }>());
export const PostPurchaseSuccess = createAction('[Purchase] Post Purchase Success', props<{ purchase: PurchaseDto }>());
