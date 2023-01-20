import { AuthService } from './authService';
import { OrderService } from './orderService';
import { UserService } from './userService';

export const GlobalServices = ({ children }): JSX.Element => {
  return (
    <AuthService>
      <UserService>
        <OrderService>{children}</OrderService>
      </UserService>
    </AuthService>
  );
};
