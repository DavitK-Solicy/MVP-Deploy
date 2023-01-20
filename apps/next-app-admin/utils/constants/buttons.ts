export interface RedirectButtonItem {
  text: string;
  link: string;
}

export const buttonPaths = {
  users: '/users',
  orders: '/orders',
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
];
