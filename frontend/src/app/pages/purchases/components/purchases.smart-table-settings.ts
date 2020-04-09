import { DatePipe, DecimalPipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { equalsOrGreater } from '../../../helpers/ng2-smart-table/filters';
import { CustomerDto, ProductDto, PurchaseDto } from '../../../models';
import { CustomBooleanEditorComponent } from './custom-boolean-editor/custom-boolean-editor.component';
import { CustomBooleanEditableViewComponent } from './custom-boolean-view/custom-boolean-editable-view.component';
import { CustomBooleanViewComponent } from './custom-boolean-view/custom-boolean-view.component';
import { CustomDateFilterComponent } from './custom-date-filter/custom-date-filter.component';

export function getSettings(translate: TranslateService, completePurchaseFn: Function): any {
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
      product: {
        title: translate.instant('global.product'),
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
      customer: {
        title: translate.instant('global.customer'),
        editable: false,
        valuePrepareFunction: (customer: CustomerDto) => customer.address,
        editor: {
          type: 'list',
        },
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
              { value: true, title: translate.instant('global.true') },
              { value: false, title: translate.instant('global.false') },
            ],
            selectText: translate.instant('global.all'),
          },
        },
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
        title: translate.instant('purchases.delivery-date'),
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
        sort: true,
        sortDirection: 'desc',
        compareFunction: (direction: -1 | 1, a: string, b: string) => {
          return (!b ? 1 : new Date(a).getTime() - new Date(b).getTime()) * direction;
        },
      },
      description: {
        title: translate.instant('global.description'),
      },
      completed: {
        title: translate.instant('purchases.completed'),
        type: 'custom',
        renderComponent: CustomBooleanEditableViewComponent,
        onComponentInitFunction: (renderComponent: CustomBooleanEditableViewComponent<PurchaseDto>) =>
          renderComponent.checkedChange.subscribe(completePurchaseFn),
        editor: {
          type: 'custom',
          component: CustomBooleanEditorComponent,
        },
        filter: {
          type: 'list',
          config: {
            list: [
              { value: true, title: translate.instant('global.true') },
              { value: false, title: translate.instant('global.false') },
            ],
            selectText: translate.instant('global.all'),
          },
        },
      },
    },
  };
}
