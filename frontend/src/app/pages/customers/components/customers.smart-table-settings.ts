import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

export const CUSTOMERS_SMART_TABLE_SETTINGS = {
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
    address: {
      title: 'Address',
    },
    phone: {
      title: 'Phone',
    },
    companyName: {
      title: 'Company name',
    },
    taxId: {
      title: 'Tax Id',
    },
    nationalId: {
      title: 'National Id',
    },
    checkingAccount: {
      title: 'Checking account',
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
  CUSTOMERS_SMART_TABLE_SETTINGS.actions.columnTitle = translate.instant('global.action-title');
  CUSTOMERS_SMART_TABLE_SETTINGS.columns.name.title = translate.instant('global.name');
  CUSTOMERS_SMART_TABLE_SETTINGS.columns.address.title = translate.instant('global.address');
  CUSTOMERS_SMART_TABLE_SETTINGS.columns.phone.title = translate.instant('global.phone');
  CUSTOMERS_SMART_TABLE_SETTINGS.columns.companyName.title = translate.instant('global.company-name');
  CUSTOMERS_SMART_TABLE_SETTINGS.columns.taxId.title = translate.instant('global.tax-id');
  CUSTOMERS_SMART_TABLE_SETTINGS.columns.nationalId.title = translate.instant('global.national-id');
  CUSTOMERS_SMART_TABLE_SETTINGS.columns.checkingAccount.title = translate.instant('global.checking-account');
  CUSTOMERS_SMART_TABLE_SETTINGS.columns.description.title = translate.instant('global.description');
  CUSTOMERS_SMART_TABLE_SETTINGS.columns.date.title = translate.instant('global.date');
  return CUSTOMERS_SMART_TABLE_SETTINGS;
}
