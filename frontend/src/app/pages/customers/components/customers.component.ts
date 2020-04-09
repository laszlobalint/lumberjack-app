import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { Store } from '@ngrx/store';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import LocalDataSource from '../../../helpers/ng2-smart-table/LocalDataSource';
import { DeleteConfirm, EditConfirm } from '../../../helpers/ng2-smart-table/ng2-smart-table.model';
import { CustomerDto } from '../../../models';
import * as fromCustomers from '../store';
import { CreateConfirm } from './../../../helpers/ng2-smart-table/ng2-smart-table.model';
import { getSettings } from './customers.smart-table-settings';

@Component({
  selector: 'ngx-customers',
  templateUrl: './customers.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class CustomersComponent implements OnDestroy {
  public readonly source = new LocalDataSource<CustomerDto>();
  public settings: any;
  public customers$ = this.customersStore.select('customers').pipe(map(state => state.customers));
  private languageSubscription: Subscription;

  constructor(
    private readonly customersStore: Store<fromCustomers.State>,
    private readonly nbToastrService: NbToastrService,
    private readonly changeDetectionRef: ChangeDetectorRef,
    private readonly translate: TranslateService,
  ) {
    this.settings = getSettings(this.translate);
    this.loadData();
    this.languageSubscription = this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.settings = getSettings(this.translate);
      setTimeout(() => {
        this.changeDetectionRef.detectChanges();
      });
    });
  }

  public ngOnDestroy(): void {
    this.languageSubscription.unsubscribe();
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

  public onCreateConfirm({ newData, confirm }: CreateConfirm<CustomerDto>): void {
    if (
      window.confirm(this.translate.instant('global.confirm-create', { item: this.translate.instant('global.customer') })) &&
      this.validateData(newData)
    ) {
      const { id, ...createCustomerDto } = newData;
      this.customersStore.dispatch(fromCustomers.SaveCustomer({ createCustomerDto, confirm }));
    } else {
      confirm.reject();
    }
  }

  public onEditConfirm({ newData, confirm }: EditConfirm<CustomerDto>): void {
    if (
      window.confirm(this.translate.instant('global.confirm-edit', { item: this.translate.instant('global.customer') })) &&
      this.validateData(newData)
    ) {
      const { id, ...updateCustomerDto } = newData;
      this.customersStore.dispatch(fromCustomers.UpdateCustomer({ id, updateCustomerDto, confirm }));
    } else {
      confirm.reject();
    }
  }

  public onDeleteConfirm({ data, confirm }: DeleteConfirm<CustomerDto>): void {
    if (window.confirm(this.translate.instant('global.confirm-delete', { item: this.translate.instant('global.customer') }))) {
      this.customersStore.dispatch(fromCustomers.DeleteCustomer({ id: data.id, confirm }));
    } else {
      confirm.reject();
    }
  }

  private validateData(data: CustomerDto): boolean {
    let error = '';
    if (!data.name || data.name.length === 0) error += this.translate.instant('validation.name');

    if (error) {
      this.nbToastrService.warning('', error);
      return false;
    }

    return true;
  }
}
