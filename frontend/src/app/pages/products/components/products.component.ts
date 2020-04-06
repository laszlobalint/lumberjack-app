import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { Store } from '@ngrx/store';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import LocalDataSource from '../../../helpers/ng2-smart-table/LocalDataSource';
import { DeleteConfirm } from '../../../helpers/ng2-smart-table/ng2-smart-table.model';
import { ProductDto } from '../../../models';
import * as fromProducts from '../store';
import { CreateConfirm, EditConfirm } from './../../../helpers/ng2-smart-table/ng2-smart-table.model';
import { getSettings } from './products.smart-table-settings';

@Component({
  selector: 'ngx-products',
  templateUrl: './products.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ProductsComponent implements OnDestroy {
  public source = new LocalDataSource<ProductDto>();
  public settings: any;
  public products$ = this.productsStore.select('products').pipe(map(state => state.products));
  private languageSubscription: Subscription;

  constructor(
    private readonly productsStore: Store<fromProducts.State>,
    private readonly nbToastrService: NbToastrService,
    private readonly changeDetectionRef: ChangeDetectorRef,
    public readonly translate: TranslateService,
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
    this.productsStore.dispatch(
      fromProducts.GetProducts({
        load: products => {
          this.source.load(products);
          this.source.setSort([{ field: 'createdDate', direction: 'desc' }]);
          this.changeDetectionRef.markForCheck();
        },
      }),
    );
  }

  public onCreateConfirm({ newData, confirm }: CreateConfirm<ProductDto>): void {
    if (
      window.confirm(this.translate.instant('global.confirm-create', { item: this.translate.instant('global.product') })) &&
      this.validateData(newData)
    ) {
      const { id, ...createProductDto } = newData;
      this.productsStore.dispatch(fromProducts.SaveProduct({ createProductDto, confirm }));
    } else {
      confirm.reject();
    }
  }

  public onEditConfirm({ newData, confirm }: EditConfirm<ProductDto>): void {
    if (
      window.confirm(this.translate.instant('global.confirm-edit', { item: this.translate.instant('global.product') })) &&
      this.validateData(newData)
    ) {
      const { id, ...updateProductDto } = newData;
      this.productsStore.dispatch(fromProducts.UpdateProduct({ id, updateProductDto, confirm }));
    } else {
      confirm.reject();
    }
  }

  public onDeleteConfirm({ data, confirm }: DeleteConfirm<ProductDto>): void {
    if (window.confirm(this.translate.instant('global.confirm-delete', { item: this.translate.instant('global.product') }))) {
      this.productsStore.dispatch(fromProducts.DeleteProduct({ id: data.id, confirm }));
    } else {
      confirm.reject();
    }
  }

  private validateData(data: ProductDto): boolean {
    let error = '';
    let isNameRepresent: boolean;
    this.source
      .getAll()
      .then(elements => (isNameRepresent = elements.some((p: ProductDto) => p.name.toLowerCase() === data.name.toLowerCase())));

    if (!data.name || isNameRepresent) error += this.translate.instant('validation.name-uniqe');

    if (error) {
      this.nbToastrService.warning('', error);
      return false;
    }

    return true;
  }
}
