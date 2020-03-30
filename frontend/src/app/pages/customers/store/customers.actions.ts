import { createAction, props } from '@ngrx/store';

import { CustomerDto, CreateCustomerDto, UpdateCustomerDto } from '../../../models';
import { SmartTableConfirm } from '../../../helpers/ng2-smart-table/ng2-smart-table.model';

export const GetCustomers = createAction('[Customers] Get Customers', props<{ load: (customers: CustomerDto[]) => any }>());
export const GetCustomersSuccess = createAction('[Customers] Get Customers Success', props<{ customers: CustomerDto[] }>());
export const SaveCustomer = createAction(
  '[Customers] Save Customer',
  props<{ createCustomerDto: CreateCustomerDto; confirm: SmartTableConfirm<CustomerDto> }>(),
);
export const SaveCustomerSuccess = createAction('[Customers] Save Customer Success', props<{ customer: CustomerDto }>());
export const UpdateCustomer = createAction(
  '[Customers] Update Customer',
  props<{ id: string; updateCustomerDto: UpdateCustomerDto; confirm: SmartTableConfirm<CustomerDto> }>(),
);
export const UpdateCustomerSuccess = createAction('[Customers] Update Customer Success', props<{ customer: CustomerDto }>());
export const DeleteCustomer = createAction('[Customers] Delete Customer', props<{ id: string; confirm: SmartTableConfirm<CustomerDto> }>());
export const DeleteCustomerSuccess = createAction('[Customers] Delete Customer Success', props<{ resId: number }>());
