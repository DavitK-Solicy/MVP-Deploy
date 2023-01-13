import AcceptPaymentCard from 'components/shared/acceptPaymentCard';
import BalanceCard from 'components/shared/balanceCard';
import DashboardOverview from 'components/shared/dashboardOverview';
import PageTitle from 'components/shared/pageTitle';
import PaymentSettings from 'components/shared/paymentSettings';
import DashboardTable from 'components/shared/table';
import TransactionFee from 'components/shared/transactionFees';
import { feeButtons } from 'utils/constants/fakeData';

import styles from './payments.module.scss';

export default function Payment(): JSX.Element {
  return (
    <div className={styles.container}>
      <PageTitle title="Payments" />
      <div className={styles.topSection}>
        <BalanceCard balance="9999" />
        <DashboardOverview />
      </div>
      <div className={styles.middleSection}>
        <AcceptPaymentCard />
        <PaymentSettings />
        <TransactionFee buttons={feeButtons} />
      </div>
      <div className={styles.bottomSection}>
        <DashboardTable rowKey="key" tableTitle="Recent Orders" />
      </div>
    </div>
  );
}
