import { OrderDetails } from 'components/feature/paymentWidget';

export interface QrPayWidgetScreenProps {
  setModal: (value: number) => void;
  usdt: number;
  orderDetails: OrderDetails;
  primaryWalletId: string;
}
