import { Component, OnInit } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { LocalDataSource } from 'ng2-smart-table';

import * as fromProducts from '../store';
import * as fromAuth from '../../../auth/store';
import { Product, CreateProductDto } from '../models/products.model';

@Component({
  selector: 'ngx-products',
  templateUrl: './products.component.html',
})
export class ProductsComponent implements OnInit {
  settings = {
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
      confirmEdit: true,
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
  ) {}

  public ngOnInit(): void {
    this.productsStore.dispatch(fromProducts.GetProducts());
    this.productsStore.select('products').subscribe(state => {
      this.products = state.products;
      this.source.load(this.products);
    });
  }

  public onCreateConfirm(event: any): void {
    window.confirm('Are you sure you want to create the product?')
      ? event.confirm.resolve(this.onCreateProduct(event.newData))
      : event.confirm.reject();
  }

  public onEditConfirm(event: any): void {
    window.confirm('Are you sure you want to edit the product?') ? event.confirm.resolve() : event.confirm.reject();
  }

  public onDeleteConfirm(event: any): void {
    window.confirm('Are you sure you want to delete the product?')
      ? event.confirm.resolve(this.onDeleteProduct(event.data.id))
      : event.confirm.reject();
  }

  private onCreateProduct(data: any): void {
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

  private onDeleteProduct(id: string) {
    this.productsStore.dispatch(fromProducts.DeleteProduct({ id }));
  }
}
