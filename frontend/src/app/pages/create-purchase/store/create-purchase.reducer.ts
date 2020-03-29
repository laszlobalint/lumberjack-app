import { Action, createReducer, on } from '@ngrx/store';
import { CustomerDto, ProductDto, PurchaseDto } from '../../../models';
import * as CreatePurchaseActions from './create-purchase.actions';

export interface CreatePurchaseState {
  purchase?: PurchaseDto;
  customers: CustomerDto[];
  products: ProductDto[];
  isBusy: boolean;
  failed: boolean;
}

export const initialState: CreatePurchaseState = {
  purchase: undefined,
  customers: [],
  products: [],
  isBusy: false,
  failed: false,
};

const reducerFunction = createReducer(
  initialState,
  on(CreatePurchaseActions.PostPurchase, state => ({
    ...state,
    isBusy: true,
    failed: false,
  })),
  on(CreatePurchaseActions.PostPurchaseSuccess, (state, { purchase }) => ({
    ...state,
    purchase,
    isBusy: false,
    failed: false,
  })),
  on(CreatePurchaseActions.PostPurchaseFailure, state => ({
    ...state,
    isBusy: false,
    failed: true,
  })),
  on(CreatePurchaseActions.ClearPurchase, state => ({
    ...state,
    purchase: undefined,
    failed: false,
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

export interface State {
  createPurchase: CreatePurchaseState;
}

export const createPurchasesFeatureKey = 'createPurchase';

export function reducer(state: CreatePurchaseState | undefined, action: Action): CreatePurchaseState {
  return reducerFunction(state, action);
}
