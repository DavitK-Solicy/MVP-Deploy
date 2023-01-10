import { UserRoles } from 'utils/constants/userRoles';

export interface User {
  _id: string;
  role: UserRoles;
  email: string;
}
