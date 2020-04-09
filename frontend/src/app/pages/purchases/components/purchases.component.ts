import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import LocalDataSource from '../../../helpers/ng2-smart-table/LocalDataSource';
import * as fromPurchases from '../store';
import { DeleteConfirm, EditConfirm } from './../../../helpers/ng2-smart-table/ng2-smart-table.model';
import { PurchaseDto } from './../../../models/purchases.model';
import { CustomBooleanViewCheckedEvent } from './custom-boolean-view/custom-boolean-editable-view.component';
import { getSettings } from './purchases.smart-table-settings';

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
export class PurchasesComponent implements OnDestroy {
  public readonly source = new LocalDataSource<PurchaseDto>();
  public settings: any;
  public purchases$ = this.purchasesStore.select('purchases').pipe(map(state => state.purchases));
  private languageSubscription: Subscription;

  constructor(
    private readonly purchasesStore: Store<fromPurchases.State>,
    private readonly nbToastrService: NbToastrService,
    private readonly changeDetectionRef: ChangeDetectorRef,
    public readonly translate: TranslateService,
  ) {
    this.settings = getSettings(this.translate, this.onCompleteChanged.bind(this));
    this.loadData();
    this.languageSubscription = this.translate.onLangChange.subscribe(async () => {
      this.settings = getSettings(this.translate, this.onCompleteChanged.bind(this));
      setTimeout(() => {
        this.changeDetectionRef.detectChanges();
      });
    });
  }

  public ngOnDestroy(): void {
    this.languageSubscription.unsubscribe();
  }

  public loadData(): void {
    this.purchasesStore.dispatch(
      fromPurchases.GetPurchases({
        load: purchases => {
          this.source.load(purchases);
          this.changeDetectionRef.markForCheck();
        },
      }),
    );
  }

  public onEditConfirm({ newData, confirm }: EditConfirm<PurchaseDto>): void {
    if (
      window.confirm(this.translate.instant('global.confirm-edit', { item: this.translate.instant('global.purchase') })) &&
      this.validateData(newData)
    ) {
      const { id, ...updatePurchase } = newData;
      this.purchasesStore.dispatch(fromPurchases.UpdatePurchase({ id, updatePurchase, confirm }));
    } else {
      confirm.reject();
    }
  }

  public onDeleteConfirm({ data, confirm }: DeleteConfirm<PurchaseDto>): void {
    if (window.confirm(this.translate.instant('global.confirm-delete', { item: this.translate.instant('global.purchase') }))) {
      this.purchasesStore.dispatch(fromPurchases.DeletePurchase({ id: data.id, confirm }));
    } else {
      confirm.reject();
    }
  }

  private onCompleteChanged = ({ rowData, checked }: CustomBooleanViewCheckedEvent<PurchaseDto>) =>
    this.onEditConfirm({
      data: rowData,
      newData: {
        ...rowData,
        completed: checked,
      },
      source: this.source,
      confirm: {
        resolve: purchase => this.source.update(rowData, purchase),
        reject: () => this.source.update(rowData, rowData),
      },
    })

  private validateData(data: PurchaseDto): boolean {
    let error = '';
    if (isNaN(data.amount) || data.amount < 0 || !data.amount) error += this.translate.instant('validation.amount');
    if (isNaN(data.price) || data.price < 0 || !data.price) error += this.translate.instant('validation.price');

    if (error) {
      this.nbToastrService.warning('', error);
      return false;
    }

    return true;
  }
}
