import { imagesSvg } from './imagesSrc';
import { CoinType } from 'types/orders';
import navBarPaths from './navBarPaths';
import { PercentType } from 'components/shared/dashboardOverview/type';
import { MenuItemType } from 'components/shared/menu/types';
import { OverviewCardProps } from 'components/shared/overviewCard/type';
import { WalletMenuItemType } from 'components/shared/walletDropdown/type';
import { OrderDataType } from 'components/shared/table/types';

export interface SocialMediaIcon {
  href: string;
  link: string;
}

export const menu: MenuItemType[] = [
  { title: 'Log Out', icon: 'logout.svg', redirectLink: navBarPaths.login },
];

export const walletMenu: WalletMenuItemType[] = [
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
  },
  {
    title: 'Total Sales',
    total: '2541',
    percent: '2.05',
    type: PercentType.DOWNGRADE,
    imgSrc: imagesSvg.sales,
  },
  {
    title: 'Total Transactions',
    total: '9541',
    percent: '0.25',
    type: PercentType.PROMOTION,
    imgSrc: imagesSvg.transaction,
  },
  {
    title: 'Total Customers',
    total: '541',
    percent: '1.25',
    type: PercentType.PROMOTION,
    imgSrc: imagesSvg.customer,
  },
];

export const walletConnectMenu: WalletMenuItemType[] = [
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

export const socialIcons: SocialMediaIcon[] = [
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
    status: 'Done',
  },
  {
    key: '8',
    title: 'John Brown',
    orderId: '#CQ2301',
    address: 'New York No. 1 Lake Park',
    type: CoinType.USD,
    amount: '$100',
    orderDate: '11/11,22, 19:40 IST',
    status: 'Failed',
  },
  {
    key: '5',
    title: 'John Brown John Brown',
    orderId: '#CQ2301',
    address: 'New York No. 1 Lake Park',
    type: CoinType.BITCOIN,
    amount: '$100',
    orderDate: '11/11,22, 19:40 IST',
    status: 'Pending',
  },
  {
    key: '4',
    title: 'John Brown',
    orderId: '#CQ2301',
    address: 'New York No. 1 Lake Park',
    type: CoinType.ETHERIUM,
    amount: '$100',
    orderDate: '11/11,22, 19:40 IST',
    status: 'Done',
  },
  {
    key: '6',
    title: 'John Brown',
    orderId: '#CQ2301',
    address: 'New York No. 1 Lake Park',
    type: CoinType.BITCOIN,
    amount: '$100',
    orderDate: '11/11,22, 19:40 IST',
    status: 'Done',
  },
  {
    key: '7',
    title: 'John Brown',
    orderId: '#CQ2301',
    address: 'New York No. 1 Lake Park',
    type: CoinType.BITCOIN,
    amount: '$100',
    orderDate: '11/11,22, 19:40 IST',
    status: 'Done',
  },
  {
    key: '7',
    title: 'John Brown',
    orderId: '#CQ2301',
    address: 'New York No. 1 Lake Park',
    type: CoinType.BITCOIN,
    amount: '$100',
    orderDate: '11/11,22, 19:40 IST',
    status: 'Done',
  },
  {
    key: '7',
    title: 'John Brown',
    orderId: '#CQ2301',
    address: 'New York No. 1 Lake Park',
    type: CoinType.BITCOIN,
    amount: '$100',
    orderDate: '11/11,22, 19:40 IST',
    status: 'Done',
  },
  {
    key: '7',
    title: 'John Brown',
    orderId: '#CQ2301',
    address: 'New York No. 1 Lake Park',
    type: CoinType.BITCOIN,
    amount: '$100',
    orderDate: '11/11,22, 19:40 IST',
    status: 'Done',
  },
  {
    key: '7',
    title: 'John Brown',
    orderId: '#CQ2301',
    address: 'New York No. 1 Lake Park',
    type: CoinType.BITCOIN,
    amount: '$100',
    orderDate: '11/11,22, 19:40 IST',
    status: 'Done',
  },
  {
    key: '7',
    title: 'John Brown',
    orderId: '#CQ2301',
    address: 'New York No. 1 Lake Park',
    type: CoinType.BITCOIN,
    amount: '$100',
    orderDate: '11/11,22, 19:40 IST',
    status: 'Done',
  },
  {
    key: '7',
    title: 'John Brown',
    orderId: '#CQ2301',
    address: 'New York No. 1 Lake Park',
    type: CoinType.BITCOIN,
    amount: '$100',
    orderDate: '11/11,22, 19:40 IST',
    status: 'Done',
  },
];
