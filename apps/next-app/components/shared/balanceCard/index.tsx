import { useEffect, useMemo, useState } from 'react';
import Web3 from 'web3';
import Icon from 'components/shared/icon';
import Button from 'components/shared/button';
import PaymentModal from 'components/feature/paymentModal';
import WithdrawModal from 'components/feature/withdrawModal';
import WhiteBox from 'components/shared/whiteBox';
import TransactionFeeModal from 'components/feature/transactionFeeModal';
import * as localStorage from 'utils/services/localStorageService';
import localStorageKeys from 'utils/constants/localStorageKeys';
import { imagesSvg } from 'utils/constants/imagesSrc';
import { coins, getCoinPrice } from 'utils/constants/functions';
import env from 'utils/constants/env';
import { ConversionItem } from './type';

import styles from './balanceCard.module.scss';

export default function BalanceCard(): JSX.Element {
  const [openPaymentModal, setOpenPaymentModal] = useState<boolean>(false);
  const [openWithdrawModal, setOpenWithdrawModal] = useState<boolean>(false);
  const [openTransactionModal, setOpenTransactionModal] = useState<boolean>(
    false
  );
  const [conversion, setConversion] = useState<ConversionItem>(
    ConversionItem.DOLLAR
  );
  const [balance, setBalance] = useState<number>();
  const iconUrl =
    conversion === ConversionItem.BITCOIN
      ? imagesSvg.bitcoin
      : imagesSvg.dollarIcon;

  const wallet = useMemo(
    () =>
      typeof window !== 'undefined' &&
      localStorage.getItemFromLocalStorage(localStorageKeys.WALLET).toString(),
    []
  );

  const changeConversion = (type: ConversionItem): void => {
    setConversion(type);
  };

  const getWalletData = async (): Promise<void> => {
    if (wallet) {
      const web3 = await new Web3(env.web3Provider);
      let balance = await web3.eth.getBalance(wallet);
      balance = web3.utils.fromWei(balance, 'ether');

      const price = await getCoinPrice(
        coins.ethereum.base,
        coins.ethereum.coinId
      );
      let availableBalance = Number(
        (price[coins.ethereum.base] * Number(balance)).toFixed(2)
      );

      if (conversion === ConversionItem.BITCOIN) {
        const price = await getCoinPrice(
          coins.bitcoin.base,
          coins.bitcoin.coinId
        );
        availableBalance = Number(
          (Number(availableBalance) / price[coins.bitcoin.base]).toFixed(4)
        );
      }
      setBalance(availableBalance);
    }
  };

  useEffect(() => {
    getWalletData();
  }, [conversion]);

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
                    src={iconUrl}
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
                <div
                  className={`${styles.conversionType} ${
                    ConversionItem.BITCOIN === conversion &&
                    styles.activeConversion
                  }`}
                  onClick={() => changeConversion(ConversionItem.BITCOIN)}
                >
                  <Icon width={25} height={25} src={imagesSvg.bitcoinCash} />
                </div>
                <div
                  className={`${styles.conversionType} ${
                    ConversionItem.DOLLAR === conversion &&
                    styles.activeConversion
                  }`}
                  onClick={() => changeConversion(ConversionItem.DOLLAR)}
                >
                  <Icon width={11} height={20} src={imagesSvg.dollarIcon} />
                </div>
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
