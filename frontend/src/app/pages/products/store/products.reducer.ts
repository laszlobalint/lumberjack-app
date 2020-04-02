import { Action, createReducer, on } from '@ngrx/store';
import { ProductDto } from '../../../models/products.model';
import * as ProductsActions from './products.actions';

interface ProductsState {
  products?: ProductDto[];
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
  on(ProductsActions.SaveProductSuccess, (state, { product }) => ({
    ...state,
    products: [...state.products, product],
  })),
  on(ProductsActions.UpdateProductSuccess, (state, { product }) => ({
    ...state,
    products: [...state.products.filter(p => p.id !== product.id), product],
  })),
  on(ProductsActions.DeleteProductSuccess, (state, { resId }) => ({
    ...state,
    products: [...state.products.filter(product => product.id !== resId)],
  })),
);

export interface State {
  products: ProductsState;
}

export const productsFeatureKey = 'products';

export function reducer(state: ProductsState | undefined, action: Action) {
  return productsReducer(state, action);
}
