import DashboardTable from 'components/shared/table';
import AnalyticsCards from 'components/feature/analyticsCards';
import AnalyticsHeader from 'components/shared/analyticsHeader';
import OverviewChart from 'components/feature/overviewChart';
import ContentLayout from 'components/feature/contentLayout';

import styles from './analytics.module.scss';

export default function Analytics(): JSX.Element {
  return (
    <ContentLayout
      title="Analytics"
      headerChildren={<AnalyticsHeader />}
      isClock={false}
    >
      <div className={styles.container}>
        <div className={styles.topSection}>
          <AnalyticsCards />
          <OverviewChart />
        </div>
        <div className={styles.bottomSection}>
          <DashboardTable rowKey="key" tableTitle="Withdrawl Table" />
        </div>
      </div>
    </ContentLayout>
  );
}
