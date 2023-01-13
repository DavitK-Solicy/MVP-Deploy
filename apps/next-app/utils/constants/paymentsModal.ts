import { imagesSvg } from './imagesSrc';

export interface PaymentsModalProps {
  type: PaymentModalType;
  icon: string;
  title: string;
  href: string;
  width: number;
  height: number;
}

export interface ConversionTypeProps {
  icon: string;
  title?: string;
  active: boolean;
}

export interface InvoiceItem {
  icon: string;
  title?: string;
  active: boolean;
}

export enum PaymentModalType {
  API = 'Api',
  INVOICE = 'Invoice',
  QR = 'QR',
  SHARE = 'Share',
}

export const paymentsModal: Array<PaymentsModalProps> = [
  {
    type: PaymentModalType.API,
    icon: imagesSvg.generatorApi,
    title: 'Generate API Button',
    href: '/',
    width: 45,
    height: 22,
  },
  {
    type: PaymentModalType.INVOICE,
    icon: imagesSvg.invoiceLink,
    title: 'Generate Invoice Link',
    href: '/',
    width: 26,
    height: 34,
  },
  {
    type: PaymentModalType.QR,
    icon: imagesSvg.generateQR,
    title: 'Generate QR',
    href: '/',
    width: 35,
    height: 33,
  },
  {
    type: PaymentModalType.SHARE,
    icon: imagesSvg.shareLink,
    title: 'Generate Share Link',
    href: '/',
    width: 30,
    height: 33,
  },
];

export const conversionType: Array<ConversionTypeProps> = [
  {
    icon: imagesSvg.bitcoinCash,
    active: false,
    title: 'Bitcoin',
  },
  {
    icon: imagesSvg.dollarIcon,
    active: true,
    title: 'Dollars',
  },
];

export const invoiceItems: Array<InvoiceItem> = [
  {
    icon: imagesSvg.rupeeIcon,
    active: false,
    title: 'Rupee',
  },
  {
    icon: imagesSvg.dollarIcon,
    active: true,
    title: 'Dollars',
  },
];
