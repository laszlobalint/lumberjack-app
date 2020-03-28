import { createAction, props } from '@ngrx/store';
import { PurchaseDto, UpdatePurchaseDto } from '../../../models';

export const GetPurchases = createAction('[Purchases] Get Purchases');
export const GetPurchasesSuccess = createAction('[Purchases] Get Purchases Success', props<{ purchases: PurchaseDto[] }>());
export const UpdatePurchase = createAction('[Purchases] Update Purchase', props<{ id: string; updatePurchase: UpdatePurchaseDto }>());
export const UpdatePurchaseSuccess = createAction('[Purchases] Edit Update Success', props<{ purchase: PurchaseDto }>());
export const DeletePurchase = createAction('[Purchases] Delete Purchase', props<{ id: string }>());
export const DeletePurchaseSuccess = createAction('[Purchases] Delete Purchase Success', props<{ resId: number }>());
