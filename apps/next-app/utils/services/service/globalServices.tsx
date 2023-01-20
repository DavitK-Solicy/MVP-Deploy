import { AuthService } from './authService';
import { OrderService } from './orderService';
import { UserService } from './userService';
import { WalletService } from './walletService';
import { InvoiceService } from './invoiceService';

export const GlobalServices = ({ children }): JSX.Element => {
  return (
    <UserService>
      <AuthService>
        <WalletService>
          <OrderService>
            <InvoiceService>{children}</InvoiceService>
          </OrderService>
        </WalletService>
      </AuthService>
    </UserService>
  );
};
