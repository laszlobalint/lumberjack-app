import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { Store } from '@ngrx/store';
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
  public readonly source: LocalDataSource = new LocalDataSource();
  public readonly settings = SETTINGS;
  public customers?: CustomerDto[];

  constructor(
    private readonly customersStore: Store<fromCustomers.State>,
    private readonly toastrService: NbToastrService,
    private readonly changeDetectionRef: ChangeDetectorRef,
  ) {}

  public ngOnInit(): void {
    this.customersStore.dispatch(fromCustomers.GetCustomers());
    this.customersStore.select('customers').subscribe(state => {
      this.customers = state.customers;
      this.source.load(this.customers);
      this.source.setSort([{ field: 'date', direction: 'desc' }]);
      this.changeDetectionRef.markForCheck();
    });
  }

  public onCreateConfirm(event: any): void {
    window.confirm('Are you sure you want to create the customer?') ? this.onCreateCustomer(event.newData, event) : event.confirm.reject();
  }

  public onUpdateConfirm(event: any): void {
    window.confirm('Are you sure you want to edit the customer?') ? this.onUpdateCustomer(event.newData) : event.confirm.reject();
  }

  public onDeleteConfirm(event: any): void {
    window.confirm('Are you sure you want to delete the customer?')
      ? event.confirm.resolve(this.onDeleteCustomer(event.data.id))
      : event.confirm.reject();
  }

  private onCreateCustomer(data: any, event: any): void {
    event.newData = {};
    const error = this.validateInputData(data);
    if (error) {
      this.toastrService.show(error, 'Error', { status: 'warning' });
      return;
    }

    const newCustomer: CreateCustomerDto = {
      name: data.name,
      address: data.address,
      phone: data.phone,
      companyName: data.companyName,
      taxId: data.taxId,
      nationalId: data.nationalId,
      checkingAccount: data.checkingAccount,
      description: data.description,
    };

    this.customersStore.dispatch(fromCustomers.SaveCustomer({ createCustomerDto: newCustomer }));
  }

  private onUpdateCustomer(data: any): void {
    const error = this.validateInputData(data);
    if (error) {
      this.toastrService.show(error, 'Error', { status: 'warning' });
      return;
    }

    const updateCustomer: UpdateCustomerDto = {
      name: data.name,
      address: data.address,
      phone: data.phone,
      companyName: data.companyName,
      taxId: data.taxId,
      nationalId: data.nationalId,
      checkingAccount: data.checkingAccount,
      description: data.description,
    };

    this.customersStore.dispatch(fromCustomers.UpdateCustomer({ id: data.id, updateCustomerDto: updateCustomer }));
  }

  private onDeleteCustomer(id: string): void {
    this.customersStore.dispatch(fromCustomers.DeleteCustomer({ id }));
  }

  private validateInputData(data: CreateCustomerDto | UpdateCustomerDto): string {
    let error = '';
    if (!data.name || this.customers.some(p => p.name.toLowerCase() === data.name.toLowerCase()))
      error += 'Name has to be given and uniqe! ';

    return error;
  }
}
