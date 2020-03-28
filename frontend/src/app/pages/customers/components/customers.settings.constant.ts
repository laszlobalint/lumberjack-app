import { DatePipe } from '@angular/common';

export const SETTINGS = {
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
      type: 'string',
    },
    address: {
      title: 'Address',
      type: 'string',
    },
    phone: {
      title: 'Phone',
      type: 'string',
    },
    companyName: {
      title: 'Company name',
      type: 'string',
    },
    taxId: {
      title: 'Tax Id',
      type: 'string',
    },
    nationalId: {
      title: 'National Id',
      type: 'string',
    },
    checkingAccount: {
      title: 'Checking account',
      type: 'string',
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
        return new DatePipe('en-US').transform(date, 'yyyy.MM.dd. HH:mm');
      },
    },
  },
};
