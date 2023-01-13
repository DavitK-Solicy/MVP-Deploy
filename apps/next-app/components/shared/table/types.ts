import { TableProps } from 'antd';
import { CoinType, OrderStatus } from 'types/orders';

export interface OrderDataType {
  key: string;
  title: string;
  orderId: string;
  address: string;
  type: CoinType;
  amount: string;
  orderDate: string;
  status: OrderStatus;
}

export default interface DashboardTableProps extends TableProps<OrderDataType> {
  tableTitle: string;
  countOfPage?: number;
  setCurrentPage?: (e: number) => void;
  rowKey?: string;
}

export interface ModalContent {
  title: string;
  message: string;
  cardType: string;
}
