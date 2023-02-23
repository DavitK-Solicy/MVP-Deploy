export interface RedirectButtonItem {
  text: string;
  link: string;
}

export const buttonPaths = {
  users: '/users',
  admins: '/admins',
  orders: '/orders',
  invoices: '/invoices',
  transactions: '/transactions',
};

export const redirectButtons: Array<RedirectButtonItem> = [
  {
    text: 'Users',
    link: buttonPaths.users,
  },
  {
    text: 'Admins',
    link: buttonPaths.admins,
  },
  {
    text: 'Orders',
    link: buttonPaths.orders,
  },
  {
    text: 'Invoices',
    link: buttonPaths.invoices,
  },
  {
    text: 'Transactions',
    link: buttonPaths.transactions,
  },
];

export const notificationIcons = {
  success: 'success',
  fail: 'fail',
};
