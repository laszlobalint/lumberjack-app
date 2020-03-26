import { Action, createReducer, on } from '@ngrx/store';
import { CustomerDto, ProductDto, PurchaseDto } from '../../../../models/';
import * as CreatePurchaseActions from '../actions/create-purchase.actions';

export interface CreatePurchaseState {
  purchase?: PurchaseDto;
  customers: CustomerDto[];
  products: ProductDto[];
}

export const initialState: CreatePurchaseState = {
  purchase: undefined,
  customers: [],
  products: [],
};

const reducerFunction = createReducer(
  initialState,
  on(CreatePurchaseActions.PostPurchaseSuccess, (state, { purchase }) => ({
    ...state,
    purchase,
  })),
  on(CreatePurchaseActions.GetCustomersSuccess, (state, { customers }) => ({
    ...state,
    customers,
  })),
  on(CreatePurchaseActions.GetProductsSuccess, (state, { products }) => ({
    ...state,
    products,
  })),
);

export function reducer(state: CreatePurchaseState | undefined, action: Action): CreatePurchaseState {
  return reducerFunction(state, action);
}
