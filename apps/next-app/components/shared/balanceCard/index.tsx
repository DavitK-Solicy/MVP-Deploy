import Icon from 'components/shared/icon';
import Button from 'components/shared/button';
import { imagesSvg } from 'utils/constants/imagesSrc';
import { BalanceCardProps } from './type';

import styles from './balanceCard.module.scss';

export default function BalanceCard({
  balance,
}: BalanceCardProps): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.balanceSection}>
        <div className={styles.balance}>
          <p className={styles.balanceTitle}>Your Balance</p>
          <p className={styles.balanceCount}>
            {balance}
            <Icon width={12} height={18} src={imagesSvg.arrow} />
          </p>
          <p className={styles.updateDate}>Last updated Oct 23, 2 pm</p>
        </div>
        <div className={styles.conversion}>
          <p>Conversion</p>
          <div>
            <Icon width={35} height={35} src={imagesSvg.dollarConversion} />
            <Icon width={35} height={35} src={imagesSvg.rupeeConversion} />
          </div>
        </div>
      </div>
      <div className={styles.footer}>
        <Button
          className={styles.paymentButton}
          text="Receive Payment"
          img={imagesSvg.walletIcon}
        />
        <Button className={styles.balanceButton} text="Withdraw Balance" />
      </div>
    </div>
  );
}
