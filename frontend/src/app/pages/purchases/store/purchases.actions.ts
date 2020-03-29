import { createAction, props } from '@ngrx/store';
import { SmartTableConfirm } from '../../../helpers/ng2-smart-table/ng2-smart-table.model';
import { PurchaseDto, UpdatePurchaseDto } from '../../../models';

export const GetPurchases = createAction('[Purchases] Get Purchases', props<{ load: (purchases: PurchaseDto[]) => any }>());
export const GetPurchasesSuccess = createAction('[Purchases] Get Purchases Success', props<{ purchases: PurchaseDto[] }>());
export const UpdatePurchase = createAction(
  '[Purchases] Update Purchase',
  props<{ id: number; updatePurchase: UpdatePurchaseDto; confirm: SmartTableConfirm<PurchaseDto> }>(),
);
export const UpdatePurchaseSuccess = createAction('[Purchases] Edit Update Success', props<{ purchase: PurchaseDto }>());
export const UpdatePurchaseFailure = createAction('[Purchases] Update Purchase Failure');
export const DeletePurchase = createAction('[Purchases] Delete Purchase', props<{ id: number; confirm: SmartTableConfirm<PurchaseDto> }>());
export const DeletePurchaseSuccess = createAction('[Purchases] Delete Purchase Success', props<{ resId: number }>());
export const DeletePurchaseFailure = createAction('[Purchases] Delete Purchase Failure');
