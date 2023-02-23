import { AuthService } from './authService';
import { InvoiceService } from './invoiceService';
import { OrderService } from './orderService';
import { TransactionService } from './transactionService';
import { UserService } from './userService';
import { AdminService } from './adminService';

export const GlobalServices = ({ children }): JSX.Element => {
  return (
    <AuthService>
      <UserService>
        <AdminService>
          <OrderService>
            <TransactionService>
              <InvoiceService>{children}</InvoiceService>
            </TransactionService>
          </OrderService>
        </AdminService>
      </UserService>
    </AuthService>
  );
};
