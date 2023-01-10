export interface PaymentsModalProps {
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

export const paymentsModal: Array<PaymentsModalProps> = [
  {
    icon: '/icons/generator-api.svg',
    title: 'Generate API Button',
    href: '/',
    width: 45,
    height: 22,
  },
  {
    icon: '/icons/invoice-link.svg',
    title: 'Generate Invoice Link',
    href: '/',
    width: 26,
    height: 34,
  },
  {
    icon: '/icons/generate-qr.svg',
    title: 'Generate QR',
    href: '/',
    width: 35,
    height: 33,
  },
  {
    icon: '/icons/share-link.svg',
    title: 'Generate Share Link',
    href: '/',
    width: 30,
    height: 33,
  },
];

export const conversionType: Array<ConversionTypeProps> = [
  {
    icon: '/icons/bitcoin-icon.svg',
    active: false,
    title: 'Bitcoin',
  },
  {
    icon: '/icons/dollar-icon.svg',
    active: true,
    title: 'Dollars',
  },
];
