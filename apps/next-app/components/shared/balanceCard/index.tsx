import { useContext, useEffect, useMemo, useState } from 'react';
import Web3 from 'web3';
import moment from 'moment';
import Icon from 'components/shared/icon';
import Button from 'components/shared/button';
import PaymentModal from 'components/feature/paymentModal';
import WithdrawModal from 'components/feature/withdrawModal';
import WhiteBox from 'components/shared/whiteBox';
import { PaymentServiceContext } from 'utils/services/service/paymentService';
import TransactionFeeModal from 'components/feature/transactionFeeModal';
import * as localStorage from 'utils/services/localStorageService';
import localStorageKeys from 'utils/constants/localStorageKeys';
import { imagesSvg } from 'utils/constants/imagesSrc';
import { coins } from 'utils/constants/functions';
import env from 'utils/constants/env';
import { Coins, ConversionItem, ConvertTo } from './type';

import styles from './balanceCard.module.scss';

export default function BalanceCard(): JSX.Element {
  const paymentService = useContext(PaymentServiceContext);

  const [openPaymentModal, setOpenPaymentModal] = useState<boolean>(false);
  const [openWithdrawModal, setOpenWithdrawModal] = useState<boolean>(false);
  const [openTransactionModal, setOpenTransactionModal] = useState<boolean>(
    false
  );
  const [conversion, setConversion] = useState<ConversionItem>(
    ConversionItem.DOLLAR
  );
  const [merchantBalance, setMerchantBalance] = useState<number>();
  const [refresh, setRefresh] = useState<boolean>(true);
  const [date, setDate] = useState<string>(moment().format('h:mm:ss a'));

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
      const walletBalance = await web3.eth.getBalance(wallet);
      const balance = Number(web3.utils.fromWei(walletBalance, 'ether'));

      let availableBalance;
      if (conversion === ConversionItem.BITCOIN) {
        const price = await paymentService.getCurrencyBalance(
          [Coins.BITCOIN],
          balance,
          ConvertTo.BTC
        );
        availableBalance = Number(price?.data[coins.bitcoin.base].toFixed(4));
        setMerchantBalance(availableBalance);
      } else {
        const price = await paymentService.getCurrencyBalance(
          [],
          balance,
          ConvertTo.USD
        );
        availableBalance = Number(price?.dollarBalance.toFixed(2));
        setMerchantBalance(availableBalance);
      }
      setDate(moment().format('h:mm:ss a'));
    }
  };

  useEffect(() => {
    getWalletData();
  }, [conversion, refresh]);

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
              <div className={styles.balanceTitle}>Your Balance</div>
              <div className={styles.balanceCount}>
                <div className={styles.balanceContainer}>
                  <Icon
                    width={20}
                    height={34}
                    src={iconUrl}
                    className={
                      conversion === ConversionItem.DOLLAR && styles.dollarIcon
                    }
                  />
                  {merchantBalance}
                </div>
                <Icon width={12} height={18} src={imagesSvg.arrow} />
              </div>
              <div className={styles.lastUpdated}>
                <span className={styles.updateDate}>Last updated {date}</span>
                <span
                  className={styles.refresh}
                  onClick={() => setRefresh(!refresh)}
                >
                  Refresh
                </span>
              </div>
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
