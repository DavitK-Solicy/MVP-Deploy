export interface PayWidgetScreenProps {
  setUsdt: (value: number) => void;
  setModal: (value: number) => void;
  payAmount: number;
}

export enum PaymentMethod {
  USDT = 'USDT',
  BITCOIN = 'Bitcoin',
}
