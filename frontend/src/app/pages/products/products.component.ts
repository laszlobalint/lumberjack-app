import { Product } from './products.model';
import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { ProductsService } from './products.service';
import { DatePipe } from '@angular/common';

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
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
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
        valuePrepareFunction: (date: string) => {
          return this.datePipe.transform(date, 'yyyy.MM.dd');
        },
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();
  data: any;

  constructor(private readonly productsService: ProductsService, private readonly datePipe: DatePipe) {}

  ngOnInit(): void {
    this.productsService.fetchAllProducts().subscribe((result: Product[]) => {
      this.data = result;
      this.source.load(this.data);
    });
  }

  onDeleteConfirm(event: any): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }
}
