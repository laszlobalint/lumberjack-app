import { Action, createReducer, on } from '@ngrx/store';

import * as ProductsActions from './products.actions';
import { Product } from '../models/products.model';

interface ProductsState {
  products?: Product[];
}

export const initialState: ProductsState = {
  products: [],
};

const productsReducer = createReducer(
  initialState,
  on(ProductsActions.GetProductsSuccess, (state, { products }) => ({
    ...state,
    products,
  })),
);

export interface State {
  products: ProductsState;
}

export const productsFeatureKey = 'products';

export function reducer(state: ProductsState | undefined, action: Action) {
  return productsReducer(state, action);
}
