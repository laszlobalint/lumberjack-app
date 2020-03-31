import { DatePipe } from '@angular/common';

export const CUSTOMERS_SMART_TABLE_SETTINGS = {
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
    createdDate: {
      title: 'Date',
      editable: false,
      addable: false,
      valuePrepareFunction: (date: string): string => {
        return new DatePipe('en-US').transform(date, 'yyyy.MM.dd. HH:mm');
      },
    },
  },
};
