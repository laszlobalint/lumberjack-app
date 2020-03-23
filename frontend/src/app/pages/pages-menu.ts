import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'PURCHASES',
    icon: 'shopping-cart-outline',
    group: true,
  },
  {
    title: 'New Purchase',
    icon: 'plus-square-outline',
    link: '/pages/purchases/create',
  },
  {
    title: 'All Purchases',
    icon: 'list-outline',
    link: '/pages/purchases',
  },
];
