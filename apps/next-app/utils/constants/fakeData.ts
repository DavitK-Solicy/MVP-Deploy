import { imagesSvg } from './imagesSrc';
import { CoinType, OrderStatus } from 'types/orders';
import navBarPaths from './navBarPaths';
import { PercentType } from 'components/shared/dashboardOverview/type';
import { MenuItemType } from 'components/shared/menu/types';
import { OverviewCardProps } from 'components/shared/overviewCard/type';
import { WalletMenuItemType } from 'components/shared/walletDropdown/type';
import { OrderDataType } from 'components/shared/table/types';
import { FeeButton, UnitsOfMeasurement } from 'types/transactions';

export interface SocialMediaIcon {
  href: string;
  link: string;
}

export interface OverviewChartDate {
  date: string;
}

export interface TimeFrameDate {
  date: string;
}

export const menu: Array<MenuItemType> = [
  { title: 'Log Out', icon: 'logout.svg', redirectLink: navBarPaths.login },
];

export const walletMenu: Array<WalletMenuItemType> = [
  {
    title: 'MetaMask',
    icon: 'metaMask.svg',
    redirectLink: '/',
    walletIcon: 'connectSuccess.svg',
  },
  {
    title: 'Change',
    icon: 'change.svg',
    redirectLink: '/',
  },
  { title: 'Disconnect', icon: 'logout.svg', redirectLink: navBarPaths.login },
];

export const dashboardOverview: Array<OverviewCardProps> = [
  {
    title: 'Total Income',
    total: '$23K',
    percent: '4.05',
    type: PercentType.PROMOTION,
    imgSrc: imagesSvg.income,
    chart: imagesSvg.smallChart,
  },
  {
    title: 'Total Sales',
    total: '2541',
    percent: '2.05',
    type: PercentType.DOWNGRADE,
    imgSrc: imagesSvg.sales,
    chart: imagesSvg.smallChart,
  },
  {
    title: 'Total Transactions',
    total: '9541',
    percent: '0.25',
    type: PercentType.PROMOTION,
    imgSrc: imagesSvg.transaction,
    chart: imagesSvg.smallChart,
  },
  {
    title: 'Total Customers',
    total: '541',
    percent: '1.25',
    type: PercentType.PROMOTION,
    imgSrc: imagesSvg.customer,
    chart: imagesSvg.smallChart,
  },
];

export const walletConnectMenu: Array<WalletMenuItemType> = [
  {
    title: 'W Connect',
    icon: 'walletConnect.svg',
    redirectLink: '/',
    walletIcon: 'connectSuccess.svg',
  },
  {
    title: 'Change',
    icon: 'change.svg',
    redirectLink: '/',
  },
  { title: 'Disconnect', icon: 'logout.svg', redirectLink: navBarPaths.login },
];

export const socialIcons: Array<SocialMediaIcon> = [
  {
    href: 'twitterLogo.svg',
    link: '`',
  },
];

export const orderColumns = [
  {
    title: 'Order ID',
    dataIndex: 'orderId',
    key: 'orderId',
    ellipsis: true,
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'Title',
    ellipsis: true,
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'Type',
    ellipsis: true,
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'Amount',
    ellipsis: true,
  },
  {
    title: 'Date Order',
    dataIndex: 'orderDate',
    key: 'orderDate',
    ellipsis: true,
  },
];

export const tableData: Array<OrderDataType> = [
  {
    key: '1',
    title: 'John Brown',
    orderId: '#CQ2301',
    address: 'New York No. 1 Lake Park',
    type: CoinType.BITCOIN,
    amount: '$100',
    orderDate: '11/11,22, 19:40 IST',
    status: OrderStatus.DONE,
  },
  {
    key: '2',
    title: 'John Brown',
    orderId: '#CQ2301',
    address: 'New York No. 1 Lake Park',
    type: CoinType.USD,
    amount: '$100',
    orderDate: '11/11,22, 19:40 IST',
    status: OrderStatus.FAILED,
  },
  {
    key: '3',
    title: 'John Brown John Brown',
    orderId: '#CQ2301',
    address: 'New York No. 1 Lake Park',
    type: CoinType.BITCOIN,
    amount: '$100',
    orderDate: '11/11,22, 19:40 IST',
    status: OrderStatus.PENDING,
  },
  {
    key: '4',
    title: 'John Brown',
    orderId: '#CQ2301',
    address: 'New York No. 1 Lake Park',
    type: CoinType.ETHEREUM,
    amount: '$100',
    orderDate: '11/11,22, 19:40 IST',
    status: OrderStatus.DONE,
  },
  {
    key: '5',
    title: 'John Brown',
    orderId: '#CQ2301',
    address: 'New York No. 1 Lake Park',
    type: CoinType.BITCOIN,
    amount: '$100',
    orderDate: '11/11,22, 19:40 IST',
    status: OrderStatus.DONE,
  },
  {
    key: '6',
    title: 'John Brown',
    orderId: '#CQ2301',
    address: 'New York No. 1 Lake Park',
    type: CoinType.BITCOIN,
    amount: '$100',
    orderDate: '11/11,22, 19:40 IST',
    status: OrderStatus.DONE,
  },
  {
    key: '7',
    title: 'John Brown',
    orderId: '#CQ2301',
    address: 'New York No. 1 Lake Park',
    type: CoinType.BITCOIN,
    amount: '$100',
    orderDate: '11/11,22, 19:40 IST',
    status: OrderStatus.DONE,
  },
  {
    key: '8',
    title: 'John Brown',
    orderId: '#CQ2301',
    address: 'New York No. 1 Lake Park',
    type: CoinType.BITCOIN,
    amount: '$100',
    orderDate: '11/11,22, 19:40 IST',
    status: OrderStatus.DONE,
  },
  {
    key: '9',
    title: 'John Brown',
    orderId: '#CQ2301',
    address: 'New York No. 1 Lake Park',
    type: CoinType.BITCOIN,
    amount: '$100',
    orderDate: '11/11,22, 19:40 IST',
    status: OrderStatus.DONE,
  },
  {
    key: '10',
    title: 'John Brown',
    orderId: '#CQ2301',
    address: 'New York No. 1 Lake Park',
    type: CoinType.BITCOIN,
    amount: '$100',
    orderDate: '11/11,22, 19:40 IST',
    status: OrderStatus.DONE,
  },
  {
    key: '11',
    title: 'John Brown',
    orderId: '#CQ2301',
    address: 'New York No. 1 Lake Park',
    type: CoinType.BITCOIN,
    amount: '$100',
    orderDate: '11/11,22, 19:40 IST',
    status: OrderStatus.DONE,
  },
  {
    key: '12',
    title: 'John Brown',
    orderId: '#CQ2301',
    address: 'New York No. 1 Lake Park',
    type: CoinType.BITCOIN,
    amount: '$100',
    orderDate: '11/11,22, 19:40 IST',
    status: OrderStatus.DONE,
  },
];

export const feeButtons: Array<FeeButton> = [
  {
    text: 'Daily',
    type: UnitsOfMeasurement.DAILY,
  },
  {
    text: 'Weekly',
    type: UnitsOfMeasurement.WEEKLY,
  },
  {
    text: 'Monthly',
    type: UnitsOfMeasurement.MONTHLY,
  },
];

export const warningModalContent = {
  acceptModalTitle: 'We have Approved the payment',
  acceptModalMessage:
    'We have approved payment to your Bank account.We will notify it’s  status. it generally takes 2 Days to refelect in your account.',
  acceptModalIcon: 'done',
  wrongModalTitle: 'We have Initiated the payment',
  wrongModalMessage:
    'We have initiated payment to your Bank account.We will notify it’s  status. it generally takes 2 Days to refelect in your account.',
  wrongModalIcon: 'pending',
  filedModalTitle: 'We were unable to connect your account',
  filedModalMessage:
    'We are trying to connect your Bank account.We will notify it’s status. but you can contact us directly or try again later.',
  filedModalIcon: 'fail',
};

export const overviewChartDates: Array<OverviewChartDate> = [
  {
    date: '12 Months',
  },
  {
    date: '6 Months',
  },
  {
    date: '30 Days',
  },
  {
    date: '7 Days',
  },
  {
    date: 'Custom',
  },
];

export const timeFrameDates: Array<TimeFrameDate> = [
  {
    date: 'All-time',
  },
  {
    date: 'This Month',
  },
  {
    date: '6 Months',
  },
  {
    date: '30 Days',
  },
  {
    date: '7 Days',
  },
  {
    date: 'Custom',
  },
];
