import { Action, createReducer, on } from '@ngrx/store';
import { PurchaseDto } from '../../models/purchases.model';
import * as CreatePurchaseActions from '../actions/create-purchase.actions';

export interface CreatePurchaseState {
  purchase?: PurchaseDto;
}

export const initialState: CreatePurchaseState = {
  purchase: undefined,
};

const reducerFunction = createReducer(
  initialState,
  on(CreatePurchaseActions.PostPurchaseSuccess, (state, { purchase }) => ({
    ...state,
    purchase,
  })),
);

export function reducer(state: CreatePurchaseState | undefined, action: Action): CreatePurchaseState {
  return reducerFunction(state, action);
}
