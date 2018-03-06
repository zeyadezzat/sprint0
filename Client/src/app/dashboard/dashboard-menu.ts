import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'nb-home',
    link: '/dashboard',
    home: true
  },
  {
    title: 'Store',
    icon: 'fa fa-shopping-basket',
    link: '/dashboard/store'
  },
  {
    title: 'Cart',
    icon: 'fa fa-shopping-cart',
    link: '/dashboard/cart'
  }
  ,
  {
    title: 'Orders',
    icon: 'fa fa-shopping-basket',
    link: '/dashboard/orders'
  }

];
