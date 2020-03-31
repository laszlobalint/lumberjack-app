import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation, NgZone } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

import LocalDataSource from '../../../helpers/ng2-smart-table/LocalDataSource';
import * as fromProducts from '../store';
import { DeleteConfirm } from '../../../helpers/ng2-smart-table/ng2-smart-table.model';
import { ProductDto } from '../../../models';
import { CreateConfirm, EditConfirm } from './../../../helpers/ng2-smart-table/ng2-smart-table.model';
import { getSettings } from './products.smart-table-settings';

@Component({
  selector: 'ngx-products',
  templateUrl: './products.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ProductsComponent {
  public source = new LocalDataSource<ProductDto>();
  public settings: any;
  public products$ = this.productsStore.select('products').pipe(map(state => state.products));

  constructor(
    private readonly productsStore: Store<fromProducts.State>,
    private readonly toastrService: NbToastrService,
    private readonly changeDetectionRef: ChangeDetectorRef,
    private readonly ngZone: NgZone,
    public readonly translate: TranslateService,
  ) {
    this.getSettings();
    this.loadData();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.getSettings();
      this.loadData();
    });
  }

  public loadData(): void {
    this.productsStore.dispatch(
      fromProducts.GetProducts({
        load: products => {
          this.source.load(products);
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

  public onCreateConfirm({ newData, confirm }: CreateConfirm<ProductDto>): void {
    if (window.confirm(this.translate.instant('global.confirm-create', { item: 'product' })) && this.validateData(newData)) {
      const { id, ...createProductDto } = newData;
      this.productsStore.dispatch(fromProducts.SaveProduct({ createProductDto, confirm }));
    } else {
      confirm.reject();
    }
  }

  public onEditConfirm({ newData, confirm }: EditConfirm<ProductDto>): void {
    if (window.confirm(this.translate.instant('global.confirm-create', { item: 'product' })) && this.validateData(newData)) {
      const { id, ...updateProductDto } = newData;
      this.productsStore.dispatch(fromProducts.UpdateProduct({ id, updateProductDto, confirm }));
    } else {
      confirm.reject();
    }
  }

  public onDeleteConfirm({ data, confirm }: DeleteConfirm<ProductDto>): void {
    if (window.confirm(this.translate.instant('global.confirm-create', { item: 'product' }))) {
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
      this.toastrService.show(error, 'Error', { status: 'warning' });
      return false;
    }

    return true;
  }
}
