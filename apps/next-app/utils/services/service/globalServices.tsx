import { AuthService } from './authService';
import { OrderService } from './orderService';
import { UserService } from './userService';
import { InvoiceService } from './invoiceService';
import { PaymentService } from './paymentService';

export const GlobalServices = ({ children }): JSX.Element => {
  return (
    <UserService>
      <AuthService>
        <PaymentService>
          <OrderService>
            <InvoiceService>{children}</InvoiceService>
          </OrderService>
        </PaymentService>
      </AuthService>
    </UserService>
  );
};
