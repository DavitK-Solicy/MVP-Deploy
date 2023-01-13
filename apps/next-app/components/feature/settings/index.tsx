import PageTitle from 'components/shared/pageTitle';
import PaymentSettings from 'components/shared/paymentSettings';

import styles from './settings.module.scss';

export default function Settings(): JSX.Element {
  return (
    <div className={styles.container}>
      <PageTitle title="Settings" />
      <div className={styles.settings}>
        <PaymentSettings />
      </div>
    </div>
  );
}
