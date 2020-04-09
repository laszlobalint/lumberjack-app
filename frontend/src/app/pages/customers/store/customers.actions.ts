import { createAction, props } from '@ngrx/store';
import { SmartTableConfirm } from '../../../helpers/ng2-smart-table/ng2-smart-table.model';
import { CreateCustomerDto, CustomerDto, UpdateCustomerDto } from '../../../models';

export const GetCustomers = createAction('[Customers] Get Customers', props<{ load: (customers: CustomerDto[]) => any }>());
export const GetCustomersSuccess = createAction('[Customers] Get Customers Success', props<{ customers: CustomerDto[] }>());
export const SaveCustomer = createAction(
  '[Customers] Save Customer',
  props<{ createCustomerDto: CreateCustomerDto; confirm: SmartTableConfirm<CustomerDto> }>(),
);
export const SaveCustomerSuccess = createAction('[Customers] Save Customer Success', props<{ customer: CustomerDto }>());
export const SaveCustomerFailure = createAction('[Customers] Save Customer Failure');
export const UpdateCustomer = createAction(
  '[Customers] Update Customer',
  props<{ id: number; updateCustomerDto: UpdateCustomerDto; confirm: SmartTableConfirm<CustomerDto> }>(),
);
export const UpdateCustomerSuccess = createAction('[Customers] Update Customer Success', props<{ customer: CustomerDto }>());
export const UpdateCustomerFailure = createAction('[Customers] Update Customer Failure');
export const DeleteCustomer = createAction('[Customers] Delete Customer', props<{ id: number; confirm: SmartTableConfirm<CustomerDto> }>());
export const DeleteCustomerSuccess = createAction('[Customers] Delete Customer Success', props<{ resId: number }>());
export const DeleteCustomerFailure = createAction('[Customers] Delete Customer Failure');
