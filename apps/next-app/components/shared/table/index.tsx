import { Table } from 'antd';
import { FilterFilled } from '@ant-design/icons';
import WhiteBox from 'components/shared/whiteBox';
import Dropdown from 'components/shared/dropDown';
import Icon from 'components/shared/icon';
import SearchInput from 'components/shared/searchInput';
import { orderColumns, tableData } from 'utils/constants/fakeData';
import { OrderStatus } from 'types/orders';
import DashboardTableProps, { OrderDataType } from './types';

import styles from './table.module.scss';

export default function DashboardTable({
  tableTitle,
  className,
  dataSource,
  countOfPage,
  setCurrentPage,
  rowKey,
  ...rest
}: DashboardTableProps): JSX.Element {
  const statusColumn = [
    {
      title: 'Order Status',
      key: 'status',
      render: (item: OrderDataType) => (
        <div className={styles.orderStatusRow}>
          <span className={`${item.status}`}>{item.status}</span>
          {item.status != OrderStatus.DONE && (
            <Icon src="pending.svg" width={20} height={20} />
          )}
        </div>
      ),
      ellipsis: true,
    },
  ];

  const columns = [...orderColumns, ...statusColumn];

  return (
    <div className={styles.table}>
      <WhiteBox>
        <div className={styles.header}>
          <div className={styles.auxiliaryTools}>
            <span className={styles.title}>Recent Orders</span>
            <Dropdown overlay={undefined}>
              <span className={styles.filter}>
                <>
                  <span>Filter</span>
                  <FilterFilled />
                </>
              </span>
            </Dropdown>
            <span className={styles.arrows}>
              <Icon src="arrows.svg" width={35} height={35} />
            </span>
          </div>
          <div className={styles.search}>
            <SearchInput searchIcon="search.svg" />
          </div>
        </div>
        <div className={className}>
          <Table
            dataSource={tableData}
            columns={columns}
            pagination={{ total: countOfPage }}
            // onChange={(e) => setCurrentPage(e.current)}
            rowKey={rowKey}
            {...rest}
          />
        </div>
      </WhiteBox>
    </div>
  );
}
