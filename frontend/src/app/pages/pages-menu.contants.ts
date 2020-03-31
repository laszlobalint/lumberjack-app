import { NbMenuItem } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'New Purchase',
    icon: 'plus-square-outline',
    link: '/pages/create-purchase',
  },
  {
    title: 'All Purchases',
    icon: 'shopping-cart-outline',
    link: '/pages/purchases',
  },
  {
    title: 'Customers',
    icon: 'person-add-outline',
    link: '/pages/customers',
  },
  {
    title: 'Products',
    icon: 'shopping-bag-outline',
    link: '/pages/products',
  },
];

export function translateMenuItems(translate: TranslateService): NbMenuItem[] {
  MENU_ITEMS[0].title = translate.instant('purchases.new');
  MENU_ITEMS[1].title = translate.instant('purchases.all');
  MENU_ITEMS[2].title = translate.instant('customers.customers');
  MENU_ITEMS[3].title = translate.instant('products.products');
  return MENU_ITEMS;
}
