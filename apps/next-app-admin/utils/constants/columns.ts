import { User } from 'utils/model/user';

export const orderColumns = [
  {
    title: 'Order ID',
    dataIndex: '_id',
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

export const invoiceColumns = [
  {
    title: 'Invoice ID',
    dataIndex: '_id',
    key: '_id',
    ellipsis: true,
  },
  {
    title: 'Created Date',
    dataIndex: 'createdAt',
    key: 'createdAt',
    ellipsis: true,
  },
  {
    title: 'Email',
    dataIndex: 'emailId',
    key: 'emailId',
    ellipsis: true,
  },
  {
    title: 'Wallet',
    dataIndex: 'walletAddress',
    key: 'walletAddress',
    ellipsis: true,
  },
  {
    title: 'Amount',
    children: [
      {
        title: 'Value',
        dataIndex: ['amount', 'value'],
        key: 'value',
        tooltip: true,
      },
      {
        title: 'Currency',
        dataIndex: ['amount', 'currency'],
        key: 'currency',
        tooltip: true,
      },
    ],
  },
  {
    title: 'Sender',
    dataIndex: 'sender',
    key: 'sender',
    ellipsis: true,
    render: (item: User) => item?.email,
  },
];
