import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { Store } from '@ngrx/store';
import { LocalDataSource } from 'ng2-smart-table';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { CreateProductDto, ProductDto, UpdateProductDto } from '../../../models';
import * as fromProducts from '../store';
import { SETTINGS } from './products.settings.constant';

@Component({
  selector: 'ngx-products',
  templateUrl: './products.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent implements OnInit, OnDestroy {
  public products$: Observable<ProductDto[]>;
  public source: LocalDataSource = new LocalDataSource();
  public readonly settings = SETTINGS;

  private productsSubscription: Subscription;

  constructor(
    private readonly productsStore: Store<fromProducts.State>,
    private readonly toastrService: NbToastrService,
    private readonly changeDetectionRef: ChangeDetectorRef,
  ) {
    this.products$ = this.productsStore.select('products').pipe(map(state => state.products));
  }

  public ngOnInit(): void {
    this.productsStore.dispatch(fromProducts.GetProducts());
    this.productsSubscription = this.products$.subscribe(products => {
      if (products) {
        this.source.load(products);
        this.source.setSort([{ field: 'date', direction: 'desc' }]);
        this.changeDetectionRef.markForCheck();
      }
    });
  }

  public ngOnDestroy() {
    this.productsSubscription.unsubscribe();
  }

  public onCreateConfirm(event: any): void {
    window.confirm('Are you sure you want to create the product?') ? this.onCreateProduct(event) : event.confirm.reject();
  }

  public onUpdateConfirm(event: any): void {
    window.confirm('Are you sure you want to edit the product?') ? this.onUpdateProduct(event) : event.confirm.reject();
  }

  public onDeleteConfirm(event: any): void {
    window.confirm('Are you sure you want to delete the product?')
      ? event.confirm.resolve(this.onDeleteProduct(event.data.id))
      : event.confirm.reject();
  }

  private onCreateProduct(event: any): void {
    const validated = this.validateInputData(event.newData);
    if (validated.error) {
      this.toastrService.show(validated.error, 'Error', { status: 'warning' });
      return;
    }

    this.productsStore.dispatch(fromProducts.SaveProduct({ createProductDto: validated.data as CreateProductDto }));
    event.confirm.resolve(this.source.empty());
  }

  private onUpdateProduct(event: any): void {
    const validated = this.validateInputData(event.newData);
    if (validated.error) {
      this.toastrService.show(validated.error, 'Error', { status: 'warning' });
      return;
    }

    this.productsStore.dispatch(fromProducts.UpdateProduct({ id: event.data.id, updateProductDto: validated.data as UpdateProductDto }));
  }

  private onDeleteProduct(id: string): void {
    this.productsStore.dispatch(fromProducts.DeleteProduct({ id }));
  }

  private validateInputData(data: CreateProductDto | UpdateProductDto): { data: CreateProductDto | UpdateProductDto; error: string } {
    data.price = Number(data.price);
    data.amount = Number(data.amount);

    let error = '';
    let isNameRepresent: boolean;

    this.source
      .getAll()
      .then(elements => (isNameRepresent = elements.some((p: ProductDto) => p.name.toLowerCase() === data.name.toLowerCase())));

    if (!data.name || isNameRepresent) error += 'Name has to be given and uniqe! ';
    if (isNaN(data.amount) || data.amount < 0 || !data.amount) error += 'Amount has to be a positive number! ';
    if (isNaN(data.price) || data.price < 0 || !data.price) error += 'Price has to be a positive number! ';

    return { data, error };
  }
}
