import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation, NgZone } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import LocalDataSource from '../../../helpers/ng2-smart-table/LocalDataSource';
import * as fromCustomers from '../store';
import { DeleteConfirm, EditConfirm } from '../../../helpers/ng2-smart-table/ng2-smart-table.model';
import { CustomerDto } from '../../../models';
import { CreateConfirm } from './../../../helpers/ng2-smart-table/ng2-smart-table.model';
import { getSettings } from './customers.smart-table-settings';

@Component({
  selector: 'ngx-customers',
  templateUrl: './customers.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CustomersComponent {
  public readonly source = new LocalDataSource<CustomerDto>();
  public settings: any;
  public customers$ = this.customersStore.select('customers').pipe(map(state => state.customers));

  constructor(
    private readonly customersStore: Store<fromCustomers.State>,
    private readonly toastrService: NbToastrService,
    private readonly changeDetectionRef: ChangeDetectorRef,
    private readonly translate: TranslateService,
    private readonly ngZone: NgZone,
  ) {
    this.getSettings();
    this.loadData();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.getSettings();
      this.loadData();
    });
  }

  public loadData(): void {
    this.customersStore.dispatch(
      fromCustomers.GetCustomers({
        load: customers => {
          this.source.load(customers);
          this.source.setSort([{ field: 'date', direction: 'desc' }]);
          this.changeDetectionRef.markForCheck();
        },
      }),
    );
  }

  public getSettings(): void {
    this.ngZone.run(() => {
      this.settings = getSettings(this.translate);
    });
  }

  public onCreateConfirm({ newData, confirm }: CreateConfirm<CustomerDto>): void {
    if (window.confirm(this.translate.instant('global.confirm-create', { item: 'customer' })) && this.validateData(newData)) {
      const { id, ...createCustomerDto } = newData;
      this.customersStore.dispatch(fromCustomers.SaveCustomer({ createCustomerDto, confirm }));
    } else {
      confirm.reject();
    }
  }

  public onEditConfirm({ newData, confirm }: EditConfirm<CustomerDto>): void {
    if (window.confirm(this.translate.instant('global.confirm-edit', { item: 'customer' })) && this.validateData(newData)) {
      const { id, ...updateCustomerDto } = newData;
      this.customersStore.dispatch(fromCustomers.UpdateCustomer({ id, updateCustomerDto, confirm }));
    } else {
      confirm.reject();
    }
  }

  public onDeleteConfirm({ data, confirm }: DeleteConfirm<CustomerDto>): void {
    if (window.confirm(this.translate.instant('global.confirm-delete', { item: 'customer' }))) {
      this.customersStore.dispatch(fromCustomers.DeleteCustomer({ id: data.id, confirm }));
    } else {
      confirm.reject();
    }
  }

  private validateData(data: CustomerDto): boolean {
    let error = '';
    if (!data.name || data.name.length === 0) error += this.translate.instant('validation.name');

    if (error) {
      this.toastrService.show(error, 'Error', { status: 'warning' });
      return false;
    }

    return true;
  }
}
