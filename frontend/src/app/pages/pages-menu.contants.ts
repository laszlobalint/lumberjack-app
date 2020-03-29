import { NbMenuItem } from '@nebular/theme';

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
