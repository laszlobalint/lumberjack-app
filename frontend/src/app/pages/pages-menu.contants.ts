import { NbMenuItem } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';

export const getMenuItems = (translate: TranslateService): NbMenuItem[] => [
  {
    title: translate.instant('purchases.new'),
    icon: 'plus-square-outline',
    link: '/pages/create-purchase',
  },
  {
    title: translate.instant('purchases.all'),
    icon: 'shopping-cart-outline',
    link: '/pages/purchases',
  },
  {
    title: translate.instant('customers.customers'),
    icon: 'person-add-outline',
    link: '/pages/customers',
  },
  {
    title: translate.instant('products.products'),
    icon: 'shopping-bag-outline',
    link: '/pages/products',
  },
];
