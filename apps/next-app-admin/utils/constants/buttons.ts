export interface RedirectButtonItem {
  text: string;
  link: string;
}

export const buttonPaths = {
  users: '/users',
  orders: '/orders',
  invoices: '/invoices',
};

export const redirectButtons: Array<RedirectButtonItem> = [
  {
    text: 'Users',
    link: buttonPaths.users,
  },
  {
    text: 'Orders',
    link: buttonPaths.orders,
  },
  {
    text: 'Invoices',
    link: buttonPaths.invoices,
  },
];

export const notificationIcons = {
  success: 'success',
  fail: 'fail',
};
