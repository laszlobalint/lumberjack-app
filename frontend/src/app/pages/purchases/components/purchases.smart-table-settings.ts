import { DatePipe, DecimalPipe } from '@angular/common';
import { CustomerDto, ProductDto } from '../../../models';
import { CustomBooleanEditorComponent } from './custom-boolean-editor/custom-boolean-editor.component';

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
    },
    reduceStock: {
      title: 'Reduce Stock',
      editor: {
        type: 'custom',
        component: CustomBooleanEditorComponent,
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
      type: 'html',
      class: 'text-center',
      editor: {
        type: 'custom',
        component: CustomBooleanEditorComponent,
      },
    },
  },
};
