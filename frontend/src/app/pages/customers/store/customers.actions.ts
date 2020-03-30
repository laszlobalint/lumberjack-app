import { createAction, props } from '@ngrx/store';

import { CustomerDto, CreateCustomerDto, UpdateCustomerDto } from '../../../models';

export const GetCustomers = createAction('[Customers] Get Customers');
export const GetCustomersSuccess = createAction('[Customers] Get Customers Success', props<{ customers: CustomerDto[] }>());
export const SaveCustomer = createAction('[Customers] Save Customer', props<{ createCustomerDto: CreateCustomerDto }>());
export const SaveCustomerSuccess = createAction('[Customers] Save Customer Success', props<{ customer: CustomerDto }>());
export const UpdateCustomer = createAction('[Customers] Update Customer', props<{ id: string; updateCustomerDto: UpdateCustomerDto }>());
export const UpdateCustomerSuccess = createAction('[Customers] Update Customer Success', props<{ customer: CustomerDto }>());
export const DeleteCustomer = createAction('[Customers] Delete Customer', props<{ id: string }>());
export const DeleteCustomerSuccess = createAction('[Customers] Delete Customers Success', props<{ resId: number }>());
