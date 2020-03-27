import { Action, createReducer, on } from '@ngrx/store';
import { CustomerDto, ProductDto, PurchaseDto } from '../../../../models/';
import * as CreatePurchaseActions from '../actions/create-purchase.actions';

export interface CreatePurchaseState {
  purchase?: PurchaseDto;
  customers: CustomerDto[];
  products: ProductDto[];
  isBusy: boolean;
}

export const initialState: CreatePurchaseState = {
  purchase: undefined,
  customers: [],
  products: [],
  isBusy: false,
};

const reducerFunction = createReducer(
  initialState,
  on(CreatePurchaseActions.PostPurchase, state => ({
    ...state,
    isBusy: true,
  })),
  on(CreatePurchaseActions.PostPurchaseSuccess, (state, { purchase }) => ({
    ...state,
    purchase,
    isBusy: false,
  })),
  on(CreatePurchaseActions.PostPurchaseFailure, state => ({
    ...state,
    isBusy: false,
  })),
  on(CreatePurchaseActions.ClearPurchase, state => ({
    ...state,
    purchase: undefined,
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
