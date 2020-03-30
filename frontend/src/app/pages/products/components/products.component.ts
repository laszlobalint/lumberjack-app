import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import LocalDataSource from '../../../helpers/ng2-smart-table/LocalDataSource';
import * as fromProducts from '../store';
import { ProductDto } from '../../../models';
import { PRODUCTS_SMART_TABLE_SETTINGS } from './products.smart-table-settings';

@Component({
  selector: 'ngx-products',
  templateUrl: './products.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class ProductsComponent {
  public source = new LocalDataSource<ProductDto>();
  public readonly settings = PRODUCTS_SMART_TABLE_SETTINGS;
  public products$ = this.productsStore.select('products').pipe(map(state => state.products));

  constructor(
    private readonly productsStore: Store<fromProducts.State>,
    private readonly toastrService: NbToastrService,
    private readonly changeDetectionRef: ChangeDetectorRef,
  ) {
    this.loadData();
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

  public onCreateConfirm({ newData, confirm }: any): void {
    if (window.confirm('Are you sure you want to create the customer?') && this.validateData(newData)) {
      const { id, ...createProductDto } = newData;
      this.productsStore.dispatch(fromProducts.SaveProduct({ createProductDto, confirm }));
    } else {
      confirm.reject();
    }
  }

  public onEditConfirm({ newData, confirm }: any): void {
    if (window.confirm('Are you sure you want to edit the product?') && this.validateData(newData)) {
      const { id, ...updateProductDto } = newData;
      this.productsStore.dispatch(fromProducts.UpdateProduct({ id, updateProductDto, confirm }));
    } else {
      confirm.reject();
    }
  }

  public onDeleteConfirm({ data, confirm }: any): void {
    if (window.confirm('Are you sure you want to delete the product?')) {
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

    if (!data.name || isNameRepresent) error += 'Name has to be given and uniqe! ';

    if (error) {
      this.toastrService.show(error, 'Error', { status: 'warning' });
      return false;
    }

    return true;
  }
}
