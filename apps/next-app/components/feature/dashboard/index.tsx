import BalanceCard from 'components/shared/balanceCard';
import CryptoMarket from 'components/shared/cryptoMarket';
import DashboardOverview from 'components/shared/dashboardOverview';
import PageTitle from 'components/shared/pageTitle';
import DashboardTable from 'components/shared/table';

import styles from './dashboard.module.scss';

export default function Dashboard(): JSX.Element {
  return (
    <div className={styles.dashboardContent}>
      <PageTitle title="Good Evening" />
      <div className={styles.topSection}>
        <BalanceCard balance="50.36" />
        <DashboardOverview />
      </div>
      <div className={styles.bottomSection}>
        <CryptoMarket />
        <DashboardTable rowKey="key" tableTitle="Recent Orders" />
      </div>
    </div>
  );
}
