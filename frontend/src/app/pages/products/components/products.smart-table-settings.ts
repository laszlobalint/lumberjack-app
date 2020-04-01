import { DatePipe, DecimalPipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

export function getSettings(translate: TranslateService): any {
  return {
    mode: 'inline',
    actions: {
      columnTitle: '',
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
        title: translate.instant('global.name'),
      },
      price: {
        title: translate.instant('global.price'),
        valuePrepareFunction: (price: number): string => {
          return new DecimalPipe('en-US').transform(price);
        },
      },
      amount: {
        title: translate.instant('global.amount'),
      },
      description: {
        title: translate.instant('global.description'),
      },
      createdDate: {
        title: translate.instant('global.created-date'),
        editable: false,
        addable: false,
        valuePrepareFunction: (date: string): string => {
          return new DatePipe('en-US').transform(date, 'yyyy.MM.dd. HH:mm');
        },
      },
    },
  };
}
