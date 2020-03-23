import { Component, OnInit } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { LocalDataSource } from 'ng2-smart-table';

import { ProductsService } from '../services/products.service';
import { Product } from '../models/products.model';
import { UserDto } from '../../../auth/models/user.model';

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
      user: {
        title: 'User',
        type: 'string',
        editable: false,
        addable: false,
        valuePrepareFunction: (user: UserDto): string => {
          return user.name;
        },
      },
    },
  };

  public readonly source: LocalDataSource = new LocalDataSource();
  public data: Product[];

  constructor(
    private readonly productsService: ProductsService,
    private readonly datePipe: DatePipe,
    private readonly decimalPipe: DecimalPipe,
  ) {}

  public ngOnInit(): void {
    this.productsService.fetchAllProducts().subscribe((result: Product[]) => {
      this.data = result;
      this.source.load(this.data);
    });
  }

  public onCreateConfirm(event: any): void {
    window.confirm('Are you sure you want to create?') ? event.confirm.resolve() : event.confirm.reject();
  }

  public onEditConfirm(event: any): void {
    window.confirm('Are you sure you want to edit?') ? event.confirm.resolve() : event.confirm.reject();
  }

  public onDeleteConfirm(event: any): void {
    window.confirm('Are you sure you want to delete?') ? event.confirm.resolve() : event.confirm.reject();
  }
}
