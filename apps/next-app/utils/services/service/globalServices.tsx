import { AuthService } from './authService';
import { OrderService } from './orderService';
import { UserService } from './userService';
import { WalletService } from './walletService';
import { InvoiceService } from './invoiceService';
import { PaymentService } from './paymentService';

export const GlobalServices = ({ children }): JSX.Element => {
  return (
    <UserService>
      <AuthService>
        <WalletService>
          <PaymentService>
            <OrderService>
              <InvoiceService>{children}</InvoiceService>
            </OrderService>
          </PaymentService>
        </WalletService>
      </AuthService>
    </UserService>
  );
};
