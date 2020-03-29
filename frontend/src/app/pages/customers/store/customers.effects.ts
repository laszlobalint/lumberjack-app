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
      mergeMap(() => this.customersService.fetchAll().pipe(map(customers => CustomersActions.GetCustomersSuccess({ customers })))),
    ),
  );

  saveCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomersActions.SaveCustomer),
      mergeMap(({ createCustomerDto }) =>
        this.customersService.save(createCustomerDto).pipe(map(customer => CustomersActions.SaveCustomerSuccess({ customer }))),
      ),
    ),
  );

  updateCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomersActions.UpdateCustomer),
      mergeMap(({ id, updateCustomerDto }) =>
        this.customersService.update(id, updateCustomerDto).pipe(map(customer => CustomersActions.UpdateCustomerSuccess({ customer }))),
      ),
    ),
  );

  deleteCustomer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CustomersActions.DeleteCustomer),
      mergeMap(({ id }) => this.customersService.delete(id).pipe(map(resId => CustomersActions.DeleteCustomerSuccess({ resId })))),
    ),
  );

  constructor(private readonly actions$: Actions, private readonly customersService: CustomersService) {}
}
