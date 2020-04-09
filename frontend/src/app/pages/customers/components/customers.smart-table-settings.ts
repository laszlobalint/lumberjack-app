import { DatePipe } from '@angular/common';
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
      address: {
        title: translate.instant('global.address'),
      },
      name: {
        title: translate.instant('global.name'),
      },
      phone: {
        title: translate.instant('global.phone'),
      },
      companyName: {
        title: translate.instant('global.company-name'),
      },
      taxId: {
        title: translate.instant('global.tax-id'),
      },
      nationalId: {
        title: translate.instant('global.national-id'),
      },
      checkingAccount: {
        title: translate.instant('global.checking-account'),
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
        sort: true,
        sortDirection: 'desc',
      },
    },
  };
}
