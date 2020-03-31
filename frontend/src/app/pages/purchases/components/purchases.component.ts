import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation, NgZone } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

import LocalDataSource from '../../../helpers/ng2-smart-table/LocalDataSource';
import * as fromPurchases from '../store';
import { PurchaseDto } from '../../../models';
import { DeleteConfirm, EditConfirm } from './../../../helpers/ng2-smart-table/ng2-smart-table.model';
import { translateSettings } from './purchases.smart-table-settings';

@Component({
  selector: 'purchases',
  templateUrl: './purchases.component.html',
  styles: [
    `
      table-cell-edit-mode,
      div[ng-reflect-ng-switch='custom'] {
        text-align: center;
      },
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class PurchasesComponent {
  public readonly source = new LocalDataSource<PurchaseDto>();
  public settings: any;
  public purchases$ = this.purchasesStore.select('purchases').pipe(map(state => state.purchases));

  constructor(
    private readonly purchasesStore: Store<fromPurchases.State>,
    private readonly toastrService: NbToastrService,
    private readonly changeDetectionRef: ChangeDetectorRef,
    private readonly ngZone: NgZone,
    public readonly translate: TranslateService,
  ) {
    this.getSettings();
    this.loadData();
  }

  public loadData(): void {
    this.purchasesStore.dispatch(
      fromPurchases.GetPurchases({
        load: purchases => {
          this.source.load(purchases);
          this.source.setSort([{ field: 'date', direction: 'desc' }]);
          this.changeDetectionRef.markForCheck();
        },
      }),
    );
  }

  public getSettings(): void {
    this.ngZone.run(() => {
      this.settings = translateSettings(this.translate);
    });
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
