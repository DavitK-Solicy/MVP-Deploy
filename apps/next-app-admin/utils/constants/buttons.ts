export interface RedirectButtonItem {
  text: string;
  link: string;
}

export const buttonPaths = {
  users: '/users',
};

export const redirectButtons: Array<RedirectButtonItem> = [
  {
    text: 'Users',
    link: buttonPaths.users,
  },
];
