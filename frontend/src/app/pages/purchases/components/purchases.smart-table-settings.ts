import { DatePipe, DecimalPipe } from '@angular/common';
import { equalsOrGreater } from '../../../helpers/ng2-smart-table/filters';
import { CustomerDto, ProductDto } from '../../../models';
import { CustomBooleanEditorComponent } from './custom-boolean-editor/custom-boolean-editor.component';
import { CustomBooleanViewComponent } from './custom-boolean-view/custom-boolean-view.component';

export const PURCHASES_SMART_TABLE_SETTINGS = {
  mode: 'inline',
  actions: {
    add: false,
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
    amount: {
      title: 'Amount',
      filterFunction: equalsOrGreater,
    },
    reduceStock: {
      title: 'Reduce Stock',
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
          selectText: 'All',
        },
      },
    },
    product: {
      title: 'Product',
      editable: false,
      valuePrepareFunction: (product: ProductDto) => product.name,
    },
    price: {
      title: 'Price',
      valuePrepareFunction: (price: number): string => {
        return new DecimalPipe('en-US').transform(price);
      },
      filterFunction: equalsOrGreater,
    },
    customer: {
      title: 'Customer',
      editable: false,
      valuePrepareFunction: (customer: CustomerDto) => customer.name || customer.address,
    },
    description: {
      title: 'Description',
    },
    date: {
      title: 'Date',
      editable: false,
      valuePrepareFunction: (date: string): string => {
        return new DatePipe('en-US').transform(date, 'yyyy.MM.dd. HH:mm');
      },
    },
    completed: {
      title: 'Completed',
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
          selectText: 'All',
        },
      },
    },
  },
};
