import { useState } from 'react';
import Icon from 'components/shared/icon';
import MarketCard from 'components/shared/marketCard';
import Button from 'components/shared/button';
import WhiteBox from 'components/shared/whiteBox';
import { imagesSvg } from 'utils/constants/imagesSrc';
import { Conversion, CryptoMarketProps, Status } from './type';

import styles from './cryptoMarket.module.scss';

export default function CryptoMarket({
  vertical,
}: CryptoMarketProps): JSX.Element {
  const [conversion, setConversion] = useState<Conversion>(Conversion.DOLLAR);

  const changeConversion = (type: Conversion): void => {
    setConversion(type);
  };

  const addConversion = (): void => {};

  return (
    <WhiteBox style={!vertical ? styles.whiteBox : styles.verticalWhiteBox}>
      <div
        className={`${!vertical ? styles.container : styles.verticalContainer}`}
      >
        <span className={styles.topSection}>
          <h1 className={styles.title}>Crypto Market</h1>
          <div className={styles.conversion}>
            <p>Conversion</p>
            <div className={styles.iconBox}>
              <Icon
                width={35}
                height={35}
                src={imagesSvg.dollarConversion}
                onClick={() => changeConversion(Conversion.DOLLAR)}
              />
              <Icon
                width={35}
                height={35}
                src={imagesSvg.rupeeConversion}
                onClick={() => changeConversion(Conversion.RUPEE)}
              />
            </div>
          </div>
        </span>
        <span className={styles.buttomSection}>
          <div className={styles.cards}>
            <MarketCard
              imageSrc={imagesSvg.bitcoin}
              status={Status.LIVE}
              title="1 Bitcoin Value:"
              value="$ 20,723.50"
            />
            <MarketCard
              imageSrc={imagesSvg.ethereum}
              status={Status.UPCOMING}
              title="1 Ether Value :"
              value="$ 2,723.78"
            />
          </div>
          <div className={styles.footer}>
            <Button
              onClick={addConversion}
              className={styles.button}
              text="Add More +"
            />
          </div>
        </span>
      </div>
    </WhiteBox>
  );
}
