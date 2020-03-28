import { Action, createReducer, on } from '@ngrx/store';
import { PurchaseDto } from '../../../models';
import * as PurchasesActions from './purchases.actions';

interface PurchasesState {
  purchases?: PurchaseDto[];
}

export const initialState: PurchasesState = {
  purchases: [],
};

const purchasesReducer = createReducer(
  initialState,
  on(PurchasesActions.GetPurchasesSuccess, (state, { purchases }) => ({
    ...state,
    purchases,
  })),
  on(PurchasesActions.UpdatePurchaseSuccess, (state, { purchase }) => ({
    ...state,
    purchases: [...state.purchases.filter(p => p.id !== purchase.id), purchase],
  })),
  on(PurchasesActions.DeletePurchaseSuccess, (state, { resId }) => ({
    ...state,
    purchases: state.purchases.filter(purchase => purchase.id !== resId),
  })),
);

export interface State {
  purchases: PurchasesState;
}

export const purchasesFeatureKey = 'purchases';

export function reducer(state: PurchasesState | undefined, action: Action) {
  return purchasesReducer(state, action);
}
