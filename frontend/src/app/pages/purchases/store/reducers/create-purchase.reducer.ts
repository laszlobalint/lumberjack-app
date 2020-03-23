import { Action, createReducer } from '@ngrx/store';

export interface CreatePurchaseState {
  purchases: any;
}

export const initialState: CreatePurchaseState = {
  purchases: {},
};

const reducerFunction = createReducer(initialState);

export function reducer(state: CreatePurchaseState | undefined, action: Action): CreatePurchaseState {
  return reducerFunction(state, action);
}
