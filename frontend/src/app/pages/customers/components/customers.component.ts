import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';

import * as fromCustomers from '../store';
import { CustomerDto, CreateCustomerDto, UpdateCustomerDto } from '../../../models';
import { SETTINGS } from './customers.settings.constant';

@Component({
  selector: 'ngx-customers',
  templateUrl: './customers.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomersComponent implements OnInit {
  public customers$: Observable<CustomerDto[]>;
  public source: LocalDataSource = new LocalDataSource();
  public readonly settings = SETTINGS;

  constructor(
    private readonly customersStore: Store<fromCustomers.State>,
    private readonly toastrService: NbToastrService,
    private readonly changeDetectionRef: ChangeDetectorRef,
  ) {
    this.customers$ = this.customersStore.select('customers').pipe(map(state => state.customers));
  }

  public ngOnInit(): void {
    this.customersStore.dispatch(fromCustomers.GetCustomers());
    this.customers$.subscribe(customers => {
      if (customers) {
        this.source.load(customers);
        this.source.setSort([{ field: 'date', direction: 'desc' }]);
        this.changeDetectionRef.markForCheck();
      }
    });
  }

  public onCreateConfirm(event: any): void {
    window.confirm('Are you sure you want to create the customer?') ? this.onCreateCustomer(event) : event.confirm.reject();
  }

  public onUpdateConfirm(event: any): void {
    window.confirm('Are you sure you want to edit the customer?') ? this.onUpdateCustomer(event) : event.confirm.reject();
  }

  public onDeleteConfirm(event: any): void {
    window.confirm('Are you sure you want to delete the customer?')
      ? event.confirm.resolve(this.onDeleteCustomer(event.data.id))
      : event.confirm.reject();
  }

  private onCreateCustomer(event: any): void {
    const error = this.validateInputData(event.newData);
    if (error) {
      this.toastrService.show(error, 'Error', { status: 'warning' });
      return;
    }

    this.customersStore.dispatch(fromCustomers.SaveCustomer({ createCustomerDto: event.newData as CreateCustomerDto }));
    event.confirm.resolve(this.source.empty());
  }

  private onUpdateCustomer(event: any): void {
    const error = this.validateInputData(event.newData);
    if (error) {
      this.toastrService.show(error, 'Error', { status: 'warning' });
      return;
    }

    this.customersStore.dispatch(
      fromCustomers.UpdateCustomer({ id: event.data.id, updateCustomerDto: event.newData as UpdateCustomerDto }),
    );
  }

  private onDeleteCustomer(id: string): void {
    this.customersStore.dispatch(fromCustomers.DeleteCustomer({ id }));
  }

  private validateInputData(data: CreateCustomerDto | UpdateCustomerDto): string {
    let error = '';
    if (!data.name || data.name.length === 0) error += 'Name is a mandatory! ';

    return error;
  }
}
