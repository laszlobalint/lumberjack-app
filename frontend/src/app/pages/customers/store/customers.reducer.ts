import { Action, createReducer, on } from '@ngrx/store';
import * as CustomersActions from './customers.actions';
import { CustomerDto } from '../../../models';

interface CustomersState {
  customers?: CustomerDto[];
}

export const initialState: CustomersState = {
  customers: [],
};

const customersReducer = createReducer(
  initialState,
  on(CustomersActions.GetCustomersSuccess, (state, { customers }) => ({
    ...state,
    customers,
  })),
  on(CustomersActions.SaveCustomerSuccess, (state, { customer }) => ({
    ...state,
    customers: [...state.customers, customer],
  })),
  on(CustomersActions.UpdateCustomerSuccess, (state, { customer }) => ({
    ...state,
    customers: [...state.customers.filter(p => p.id !== customer.id), customer],
  })),
  on(CustomersActions.DeleteCustomerSuccess, (state, { resId }) => ({
    ...state,
    customers: [...state.customers.filter(customer => customer.id !== resId)],
  })),
);

export interface State {
  customers: CustomersState;
}

export const customersFeatureKey = 'customers';

export function reducer(state: CustomersState | undefined, action: Action) {
  return customersReducer(state, action);
}
