import { Component, OnInit } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';

import * as fromProducts from '../store';
import * as fromAuth from '../../../auth/store';
import { Product, CreateProductDto, UpdateProductDto } from '../models/products.model';

@Component({
  selector: 'ngx-products',
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
  settings = {
    mode: 'inline',
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      name: {
        title: 'Name',
        type: 'string',
      },
      price: {
        title: 'Price',
        type: 'number',
        valuePrepareFunction: (price: number): string => {
          return this.decimalPipe.transform(price);
        },
      },
      amount: {
        title: 'Amount',
        type: 'number',
      },
      description: {
        title: 'Description',
        type: 'string',
      },
      date: {
        title: 'Date',
        type: 'date',
        editable: false,
        addable: false,
        valuePrepareFunction: (date: string): string => {
          return this.datePipe.transform(date, 'yyyy.MM.dd.');
        },
      },
    },
  };

  public readonly source: LocalDataSource = new LocalDataSource();
  public products?: Product[];

  constructor(
    private readonly productsStore: Store<fromProducts.State>,
    private readonly authStore: Store<fromAuth.State>,
    private readonly datePipe: DatePipe,
    private readonly decimalPipe: DecimalPipe,
    private readonly toastrService: NbToastrService,
  ) {}

  public ngOnInit(): void {
    this.productsStore.dispatch(fromProducts.GetProducts());
    this.productsStore.select('products').subscribe(state => {
      this.products = state.products;
      this.source.load(this.products);
    });
  }

  public onCreateConfirm(event: any): void {
    window.confirm('Are you sure you want to create the product?') ? this.onCreateProduct(event.newData) : event.confirm.reject();
  }

  public onUpdateConfirm(event: any): void {
    window.confirm('Are you sure you want to edit the product?') ? this.onUpdateProduct(event.newData) : event.confirm.reject();
  }

  public onDeleteConfirm(event: any): void {
    window.confirm('Are you sure you want to delete the product?')
      ? event.confirm.resolve(this.onDeleteProduct(event.data.id))
      : event.confirm.reject();
  }

  private onCreateProduct(data: any): void {
    const error = this.validateInputData(data);
    if (error) {
      this.toastrService.show(error, 'Error', { status: 'warning' });
      return;
    }

    let userId: number;
    this.authStore
      .select('user')
      .pipe(take(1))
      .subscribe(state => {
        userId = state.user.id;
      });

    const newProduct: CreateProductDto = {
      createdBy: userId,
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

  private validateInputData(data: CreateProductDto | UpdateProductDto) {
    let error = '';
    if (typeof data.amount !== 'string' || data.name.length < 2) error += 'Name has to be given! ';
    if (typeof data.amount !== 'number' || data.amount < 0) error += 'Amount has to be a positive number! ';
    if (typeof data.price !== 'number' || data.amount < 0) error += 'Price has to be a positive number! ';
    return error;
  }
}
