import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { Store } from '@ngrx/store';
import { LocalDataSource } from 'ng2-smart-table';
import { CreateProductDto, ProductDto, UpdateProductDto } from '../../../models';
import * as fromProducts from '../store';
import { SETTINGS } from './products.settings.constant';

@Component({
  selector: 'ngx-products',
  templateUrl: './products.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent implements OnInit {
  public readonly source: LocalDataSource = new LocalDataSource();
  public readonly settings = SETTINGS;
  public products?: ProductDto[];

  constructor(
    private readonly productsStore: Store<fromProducts.State>,
    private readonly toastrService: NbToastrService,
    private readonly changeDetectionRef: ChangeDetectorRef,
  ) {}

  public ngOnInit(): void {
    this.productsStore.dispatch(fromProducts.GetProducts());
    this.productsStore.select('products').subscribe(state => {
      this.products = state.products;
      this.source.load(this.products);
      this.source.setSort([{ field: 'date', direction: 'desc' }]);
      this.changeDetectionRef.markForCheck();
    });
  }

  public onCreateConfirm(event: any): void {
    window.confirm('Are you sure you want to create the product?') ? this.onCreateProduct(event.newData, event) : event.confirm.reject();
  }

  public onUpdateConfirm(event: any): void {
    window.confirm('Are you sure you want to edit the product?') ? this.onUpdateProduct(event.newData) : event.confirm.reject();
  }

  public onDeleteConfirm(event: any): void {
    window.confirm('Are you sure you want to delete the product?')
      ? event.confirm.resolve(this.onDeleteProduct(event.data.id))
      : event.confirm.reject();
  }

  private onCreateProduct(data: any, event: any): void {
    event.newData = {};
    const error = this.validateInputData(data);
    if (error) {
      this.toastrService.show(error, 'Error', { status: 'warning' });
      return;
    }

    const newProduct: CreateProductDto = {
      name: data.name,
      price: Number(data.price),
      amount: Number(data.amount),
      description: data.description,
    };

    this.productsStore.dispatch(fromProducts.SaveProduct({ createProductDto: newProduct }));
  }

  private onUpdateProduct(data: any): void {
    const error = this.validateInputData(data);
    if (error) {
      this.toastrService.show(error, 'Error', { status: 'warning' });
      return;
    }

    const updateProduct: UpdateProductDto = {
      name: data.name,
      price: Number(data.price),
      amount: Number(data.amount),
      description: data.description,
    };

    this.productsStore.dispatch(fromProducts.UpdateProduct({ id: data.id, updateProductDto: updateProduct }));
  }

  private onDeleteProduct(id: string): void {
    this.productsStore.dispatch(fromProducts.DeleteProduct({ id }));
  }

  private validateInputData(data: CreateProductDto | UpdateProductDto): string {
    let error = '';
    if (!data.name || this.products.some(p => p.name.toLowerCase() === data.name.toLowerCase()))
      error += 'Name has to be given and uniqe! ';
    if (isNaN(data.amount) || data.amount < 0 || !data.amount) error += 'Amount has to be a positive number! ';
    if (isNaN(data.price) || data.price < 0 || !data.price) error += 'Price has to be a positive number! ';

    return error;
  }
}
