import { OrderDetails } from '../paymentWidget';

export interface WidgetPaymentModalProps {
  open: boolean;
  setOpen: (item: boolean) => void;
  orderDetails: OrderDetails;
  primaryWalletId: string;
}
