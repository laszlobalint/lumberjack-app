import { Action, ActionReducerMap } from '@ngrx/store';
import * as fromCreatePurchase from './reducers/create-purchase.reducer';

interface PurchasesState {
  createPurchase: fromCreatePurchase.CreatePurchaseState;
}

export const reducers: ActionReducerMap<PurchasesState, Action> = {
  createPurchase: fromCreatePurchase.reducer,
};

export interface State {
  purchases: PurchasesState;
}

export const purchasesFeatureKey = 'purchases';
