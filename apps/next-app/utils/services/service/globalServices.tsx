import { AuthService } from './authService';
import { UserService } from './userService';

export const GlobalServices = ({ children }): JSX.Element => {
  return (
    <UserService>
      <AuthService>{children}</AuthService>
    </UserService>
  );
};
