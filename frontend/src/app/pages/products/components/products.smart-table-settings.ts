import { DatePipe, DecimalPipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

export const PRODUCTS_SMART_TABLE_SETTINGS = {
  mode: 'inline',
  actions: {
    columnTitle: 'Actions',
  },
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
    },
    price: {
      title: 'Price',
      valuePrepareFunction: (price: number): string => {
        return new DecimalPipe('en-US').transform(price);
      },
    },
    amount: {
      title: 'Amount',
    },
    description: {
      title: 'Description',
    },
    date: {
      title: 'Date',
      editable: false,
      addable: false,
      valuePrepareFunction: (date: string): string => {
        return new DatePipe('en-US').transform(date, 'yyyy.MM.dd. HH:mm');
      },
    },
  },
};

export function translateSettings(translate: TranslateService): any {
  PRODUCTS_SMART_TABLE_SETTINGS.actions.columnTitle = translate.instant('global.action-title');
  PRODUCTS_SMART_TABLE_SETTINGS.columns.name.title = translate.instant('global.name');
  PRODUCTS_SMART_TABLE_SETTINGS.columns.price.title = translate.instant('global.price');
  PRODUCTS_SMART_TABLE_SETTINGS.columns.amount.title = translate.instant('global.amount');
  PRODUCTS_SMART_TABLE_SETTINGS.columns.description.title = translate.instant('global.description');
  PRODUCTS_SMART_TABLE_SETTINGS.columns.date.title = translate.instant('global.date');
  return PRODUCTS_SMART_TABLE_SETTINGS;
}
