import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import LocalDataSource from '../../../helpers/ng2-smart-table/LocalDataSource';
import { EditConfirm } from '../../../helpers/ng2-smart-table/ng2-smart-table.model';
import { CustomerDto } from '../../../models';
import * as fromCustomers from '../store';
import { CUSTOMERS_SMART_TABLE_SETTINGS } from './customers.smart-table-settings';

@Component({
  selector: 'ngx-customers',
  templateUrl: './customers.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CustomersComponent {
  public readonly source = new LocalDataSource<CustomerDto>();
  public readonly settings = CUSTOMERS_SMART_TABLE_SETTINGS;
  public customers$ = this.customersStore.select('customers').pipe(map(state => state.customers));

  constructor(
    private readonly customersStore: Store<fromCustomers.State>,
    private readonly toastrService: NbToastrService,
    private readonly changeDetectionRef: ChangeDetectorRef,
  ) {
    this.loadData();
    this.source.setSort([{ field: 'date', direction: 'desc' }]);
  }

  public loadData(): void {
    this.customersStore.dispatch(
      fromCustomers.GetCustomers({
        load: customers => {
          this.source.load(customers);
          this.changeDetectionRef.markForCheck();
        },
      }),
    );
  }

  public onCreateConfirm({ newData, confirm }: any): void {
    if (window.confirm('Are you sure you want to create the customer?') && this.validateData(newData)) {
      const { id, ...createCustomerDto } = newData;
      this.customersStore.dispatch(fromCustomers.SaveCustomer({ createCustomerDto, confirm }));
    } else {
      confirm.reject();
    }
  }

  public onEditConfirm({ newData, confirm }: EditConfirm<CustomerDto>): void {
    if (window.confirm('Are you sure you want to edit the customer?') && this.validateData(newData)) {
      const { id, ...updateCustomerDto } = newData;
      this.customersStore.dispatch(fromCustomers.UpdateCustomer({ id, updateCustomerDto, confirm }));
    } else {
      confirm.reject();
    }
  }

  public onDeleteConfirm({ data, confirm }: any): void {
    if (window.confirm('Are you sure you want to delete the customer?')) {
      this.customersStore.dispatch(fromCustomers.DeleteCustomer({ id: data.id, confirm }));
    } else {
      confirm.reject();
    }
  }

  private validateData(data: CustomerDto): boolean {
    let error = '';
    if (!data.name || data.name.length === 0) error += 'Name is a mandatory! ';

    if (error) {
      this.toastrService.show(error, 'Error', { status: 'warning' });
      return false;
    }

    return true;
  }
}
