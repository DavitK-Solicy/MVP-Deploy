import DashboardTable from 'components/shared/table';

import styles from './orders.module.scss';

export default function Orders(): JSX.Element {
  return (
    <div className={styles.ordersContent}>
        <DashboardTable rowKey='_id' />
    </div>
  );
}
