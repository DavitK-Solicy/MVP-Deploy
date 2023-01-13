import { useState } from 'react';
import Icon from 'components/shared/icon';
import Button from 'components/shared/button';
import PaymentModal from 'components/feature/paymentModal';
import WithdrawModal from 'components/feature/withdrawModal';
import WhiteBox from 'components/shared/whiteBox';
import TransactionFeeModal from 'components/feature/transactionFeeModal';
import { imagesSvg } from 'utils/constants/imagesSrc';
import { BalanceCardProps } from './type';

import styles from './balanceCard.module.scss';

export default function BalanceCard({
  balance,
}: BalanceCardProps): JSX.Element {
  const [openPaymentModal, setOpenPaymentModal] = useState<boolean>(false);
  const [openWithdrawModal, setOpenWithdrawModal] = useState<boolean>(false);
  const [openTransactionModal, setOpenTransactionModal] = useState<boolean>(
    false
  );

  return (
    <>
      <PaymentModal open={openPaymentModal} setOpen={setOpenPaymentModal} />
      <WithdrawModal
        open={openWithdrawModal}
        setOpen={setOpenWithdrawModal}
        setOpenChild={setOpenTransactionModal}
        bunkNumber={374}
        balance={758}
      />
      <TransactionFeeModal
        open={openTransactionModal}
        setOpen={setOpenTransactionModal}
        setOpenParent={setOpenWithdrawModal}
      />
      <WhiteBox style={styles.whiteBox}>
        <div className={styles.container}>
          <div className={styles.balanceSection}>
            <div className={styles.balance}>
              <p className={styles.balanceTitle}>Your Balance</p>
              <p className={styles.balanceCount}>
                <div className={styles.balanceContainer}>
                  <Icon
                    width={20}
                    height={34}
                    src={imagesSvg.dollarIcon}
                    className={styles.dollarIcon}
                  />
                  {balance}
                </div>
                <Icon width={12} height={18} src={imagesSvg.arrow} />
              </p>
              <p className={styles.updateDate}>Last updated Oct 23, 2 pm</p>
            </div>
            <div className={styles.conversion}>
              <p>Conversion</p>
              <div>
                <Icon width={35} height={35} src={imagesSvg.rupeeConversion} />
                <Icon width={35} height={35} src={imagesSvg.dollarConversion} />
              </div>
            </div>
          </div>
          <div className={styles.footer}>
            <Button
              className={styles.paymentButton}
              text="Receive Payment"
              img={imagesSvg.walletIcon}
              onClick={() => setOpenPaymentModal(true)}
            />
            <Button
              className={styles.balanceButton}
              text="Withdraw Balance"
              onClick={() => setOpenWithdrawModal(true)}
            />
          </div>
        </div>
      </WhiteBox>
    </>
  );
}
