import { useContext, useEffect, useState } from 'react';
import Button from 'components/shared/button';
import Icon from 'components/shared/icon';
import Notification from 'components/shared/notification';
import { Coins, ConversionItem } from 'components/shared/balanceCard/type';
import { imagesSvg } from 'utils/constants/imagesSrc';
import { PaymentServiceContext } from 'utils/services/service/paymentService';
import { coins } from 'utils/constants/functions';
import { PaymentMethod, PayWidgetScreenProps } from './types';

import styles from './payWidgetScreen.module.scss';

export default function PayWidgetScreen({
  setModal,
  setUsdt,
  payAmount,
}: PayWidgetScreenProps): JSX.Element {
  const paymentService = useContext(PaymentServiceContext);

  const [conversion, setConversion] = useState<ConversionItem>(
    ConversionItem.DOLLAR
  );
  const [productsPrice, setProductsPrice] = useState<number>();
  const [usdtPrice, setUsdtPrice] = useState<number>(0);
  const [bitcoinValue, setBitcoinValue] = useState<number>();
  const [disabled, setDisabled] = useState<boolean>(false);
  const [paymentCurrency, setPaymentCurrency] = useState<string>(
    PaymentMethod.BITCOIN
  );

  const iconUrl =
    conversion === ConversionItem.BITCOIN
      ? imagesSvg.bitcoin
      : imagesSvg.dollarIcon;

  const getWalletData = async (): Promise<void> => {
    let availableBalance;
    const price = await paymentService.convertUsdToCoin(
      conversion === ConversionItem.BITCOIN
        ? [Coins.BITCOIN, Coins.USDT, Coins.ETHEREUM]
        : [Coins.USDT, Coins.BITCOIN],
      payAmount
    );

    if (price?.success) {
      availableBalance = Number(
        conversion === ConversionItem.BITCOIN
          ? price?.data[coins.bitcoin.base].toFixed(4)
          : payAmount
      );
      setUsdt(Number(price?.data[coins.tether.base].toFixed(4)));
      setBitcoinValue(price?.bitcoin);
      setUsdtPrice(Number(price?.data[coins.tether.base].toFixed(4)));
      setProductsPrice(availableBalance);
    } else {
      Notification(price?.error);
    }
  };

  const changePayment = (value: PaymentMethod): void => {
    setPaymentCurrency(value);
  };

  useEffect(() => {
    getWalletData();
  }, [conversion]);

  const changeConversion = (type: ConversionItem): void => {
    setConversion(type);
    setDisabled(true);
    setTimeout(() => setDisabled(false), 3000);
  };

  const handleChangeModal = (): void => {
    setModal(2);
  };

  return (
    <div className={styles.container}>
      <div className={styles.balanceSection}>
        <div className={styles.balanceContainer}>
          <span>Amount to pay</span>
          <div className={styles.amount}>
            <Icon
              width={20}
              height={34}
              src={iconUrl}
              className={
                conversion === ConversionItem.DOLLAR && styles.dollarIcon
              }
            />
            {productsPrice}
          </div>
        </div>
        <div className={styles.conversion}>
          <p>Conversion</p>
          <div>
            <button
              className={`${styles.conversionType} ${
                ConversionItem.BITCOIN === conversion && styles.activeConversion
              }`}
              onClick={() => changeConversion(ConversionItem.BITCOIN)}
              disabled={ConversionItem.BITCOIN !== conversion && disabled}
            >
              <Icon width={25} height={25} src={imagesSvg.bitcoinCash} />
            </button>
            <button
              className={`${styles.conversionType} ${
                ConversionItem.DOLLAR === conversion && styles.activeConversion
              }`}
              onClick={() => changeConversion(ConversionItem.DOLLAR)}
              disabled={ConversionItem.DOLLAR !== conversion && disabled}
            >
              <Icon width={11} height={20} src={imagesSvg.dollarIcon} />
            </button>
          </div>
        </div>
      </div>
      <div className={styles.bitcoinValue}>
        <Icon width={40} height={40} src={imagesSvg.bitcoin} />
        <div className={styles.priceSection}>
          <div className={styles.state}>
            <span className={styles.dot} />
            <span>Live</span>
          </div>
          <div className={styles.bitcoin}>
            1 Bitcoin Value : <span>${bitcoinValue}</span>
          </div>
        </div>
      </div>
      <div className={styles.selectPayment}>
        <div className={styles.selectPaymentTitle}>Select Payment Currency</div>
        <div className={styles.allCurrencies}>
          <div
            className={styles.currency}
            onClick={() => changePayment(PaymentMethod.USDT)}
          >
            <Icon width={30} height={30} src={imagesSvg.usdtIcon} />
            <div className={styles.currencySection}>
              <div className={styles.coin}>USDT</div>
              <div className={styles.price}>{usdtPrice}</div>
            </div>
          </div>
          <div className={styles.commissionInfo}>
            *The price is inclusive of platform commission
          </div>
        </div>
      </div>
      <div className={styles.moreCurrencies}>
        <span>More Currencies</span>
        <span>
          <Icon src={imagesSvg.arrow} width={15} height={15} />
        </span>
      </div>
      <div className={styles.buttonWrapper}>
        <Button
          text={`Pay with ${paymentCurrency}`}
          className={styles.payButton}
          onClick={handleChangeModal}
          disabled={paymentCurrency !== PaymentMethod.USDT}
        />
      </div>
      <div className={styles.creatorInfo}>
        <span>Powered by CryptoPool</span>
        <span>Help & Support</span>
      </div>
    </div>
  );
}
