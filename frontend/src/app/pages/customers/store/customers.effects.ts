import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';

import * as CustomersActions from './customers.actions';
import { CustomersService } from '../../../services';

@Injectable()
export class CustomerEffects {
  getCustomers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomersActions.GetCustomers),
      mergeMap(({ load }) =>
        this.customersService.fetchAll().pipe(
          map(customers => {
            load(customers);
            return CustomersActions.GetCustomersSuccess({ customers });
          }),
        ),
      ),
    ),
  );

  saveCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomersActions.SaveCustomer),
      mergeMap(({ createCustomerDto, confirm }) =>
        this.customersService.save(createCustomerDto).pipe(
          map(customer => {
            confirm.resolve({ ...customer, date: new Date().toUTCString() });
            return CustomersActions.SaveCustomerSuccess({ customer });
          }),
        ),
      ),
    ),
  );

  updateCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomersActions.UpdateCustomer),
      mergeMap(({ id, updateCustomerDto, confirm }) =>
        this.customersService.update(id, updateCustomerDto).pipe(
          map(customer => {
            confirm.resolve(customer);
            return CustomersActions.UpdateCustomerSuccess({ customer });
          }),
        ),
      ),
    ),
  );

  deleteCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomersActions.DeleteCustomer),
      mergeMap(({ id, confirm }) =>
        this.customersService.delete(id).pipe(
          map(resId => {
            confirm.resolve();
            return CustomersActions.DeleteCustomerSuccess({ resId });
          }),
        ),
      ),
    ),
  );

  constructor(private readonly actions$: Actions, private readonly customersService: CustomersService) {}
}
