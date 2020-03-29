import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import LocalDataSource from '../../../helpers/ng2-smart-table/LocalDataSource';
import { DeleteConfirm, EditConfirm } from '../../../helpers/ng2-smart-table/ng2-smart-table.model';
import { PurchaseDto } from '../../../models';
import * as fromPurchases from '../store';
import { PURCHASES_SMART_TABLE_SETTINGS } from './purchases.smart-table-settings';

@Component({
  selector: 'purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PurchasesComponent implements OnDestroy {
  public readonly source = new LocalDataSource<PurchaseDto>();
  public readonly settings = PURCHASES_SMART_TABLE_SETTINGS;
  public purchases$ = this.purchasesStore.select('purchases').pipe(map(state => state.purchases));

  purchasesSubscription: Subscription;

  constructor(
    private readonly purchasesStore: Store<fromPurchases.State>,
    private readonly toastrService: NbToastrService,
    private readonly changeDetectionRef: ChangeDetectorRef,
  ) {
    this.purchasesStore.dispatch(fromPurchases.GetPurchases());
    this.purchasesSubscription = this.purchases$.subscribe(purchases => {
      this.source.load(purchases);
      this.source.setSort([{ field: 'date', direction: 'desc' }]);
      this.changeDetectionRef.markForCheck();
    });
  }

  public ngOnDestroy() {
    this.purchasesSubscription.unsubscribe();
  }

  public onEditConfirm({ newData, confirm }: EditConfirm<PurchaseDto>): void {
    if (window.confirm('Are you sure you want to edit the product?') && this.validateData(newData)) {
      const { id, ...updatePurchase } = newData;
      this.purchasesStore.dispatch(fromPurchases.UpdatePurchase({ id, updatePurchase, confirm }));
    } else {
      confirm.reject();
    }
  }

  public onDeleteConfirm({ data, confirm }: DeleteConfirm<PurchaseDto>): void {
    if (window.confirm('Are you sure you want to delete the product?')) {
      this.purchasesStore.dispatch(fromPurchases.DeletePurchase({ id: data.id, confirm }));
    } else {
      confirm.reject();
    }
  }

  private validateData(data: PurchaseDto): boolean {
    let error = '';
    if (isNaN(data.amount) || data.amount < 0 || !data.amount) error += 'Amount has to be a positive number! ';
    if (isNaN(data.price) || data.price < 0 || !data.price) error += 'Price has to be a positive number! ';

    if (error) {
      this.toastrService.show(error, 'Error', { status: 'warning' });
      return false;
    }

    return true;
  }
}
