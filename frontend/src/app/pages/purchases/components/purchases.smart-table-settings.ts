import { DatePipe, DecimalPipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { equalsOrGreater } from '../../../helpers/ng2-smart-table/filters';
import { CustomerDto, ProductDto } from '../../../models';
import { CustomBooleanEditorComponent } from './custom-boolean-editor/custom-boolean-editor.component';
import { CustomBooleanViewComponent } from './custom-boolean-view/custom-boolean-view.component';
import { CustomDateFilterComponent } from './custom-date-filter/custom-date-filter.component';

export function getSettings(translate: TranslateService): any {
  return {
    mode: 'inline',
    actions: {
      add: false,
      columnTitle: '',
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
    filter: {
      inputClass: 'text-gray',
    },
    columns: {
      amount: {
        title: translate.instant('global.amount'),
        filterFunction: equalsOrGreater,
      },
      reduceStock: {
        title: translate.instant('purchases.reduce-stock'),
        type: 'custom',
        renderComponent: CustomBooleanViewComponent,
        editor: {
          type: 'custom',
          component: CustomBooleanEditorComponent,
        },
        filter: {
          type: 'list',
          config: {
            list: [
              { value: true, title: 'True' },
              { value: false, title: 'False' },
            ],
            selectText: translate.instant('global.all'),
          },
        },
      },
      product: {
        title: translate.instant('products.product'),
        editable: false,
        valuePrepareFunction: (product: ProductDto) => product.name,
        editor: {
          type: 'list',
        },
      },
      price: {
        title: translate.instant('global.price'),
        valuePrepareFunction: (price: number): string => {
          return new DecimalPipe('en-US').transform(price);
        },
        filterFunction: equalsOrGreater,
      },
      createdDate: {
        title: translate.instant('global.created-date'),
        valuePrepareFunction: (date: string): string => {
          return new DatePipe('en-US').transform(date, 'yyyy.MM.dd. HH:mm');
        },
        editable: false,
        filter: {
          type: 'custom',
          component: CustomDateFilterComponent,
        },
        filterFunction: (cell: string, range: Date[]) => {
          const cellDate = new Date(cell);
          return (!range[0] || cellDate.getTime() >= range[0].getTime()) && (!range[1] || cellDate.getTime() <= range[1].getTime());
        },
      },
      deliveryDate: {
        title: 'Delivery',
        valuePrepareFunction: (date: string): string => {
          return new DatePipe('en-US').transform(date, 'yyyy.MM.dd. HH:mm');
        },
        filter: {
          type: 'custom',
          component: CustomDateFilterComponent,
        },
        filterFunction: (cell: string, range: Date[]) => {
          const cellDate = new Date(cell);
          return (!range[0] || cellDate.getTime() >= range[0].getTime()) && (!range[1] || cellDate.getTime() <= range[1].getTime());
        },
      },
      customer: {
        title: translate.instant('purchases.customer'),
        editable: false,
        valuePrepareFunction: (customer: CustomerDto) => customer.address || customer.name,
        editor: {
          type: 'list',
        },
      },
      description: {
        title: translate.instant('global.description'),
      },
      completed: {
        title: translate.instant('purchases.completed'),
        type: 'custom',
        renderComponent: CustomBooleanViewComponent,
        editor: {
          type: 'custom',
          component: CustomBooleanEditorComponent,
        },
        filter: {
          type: 'list',
          config: {
            list: [
              { value: true, title: 'True' },
              { value: false, title: 'False' },
            ],
            selectText: translate.instant('global.all'),
          },
        },
      },
    },
  };
}
