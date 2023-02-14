import Icon from 'components/shared/icon';
import Button from 'components/shared/button';
import { imagesSvg } from 'utils/constants/imagesSrc';

import styles from './congratsWidgetScreen.module.scss';

export default function CongratsWidgetScreen(): JSX.Element {
  return (
    <div className={styles.container}>
      <div className={styles.congrats}>
        <Icon src={imagesSvg.congrats} width={180} height={150} />
        <div className={styles.hands}>
          <span>Congratulations</span>
          <Icon src={imagesSvg.clappingHands} width={30} height={15} />
        </div>
        <div className={styles.text}>
          Your Payment successfully. We have sent a email confirmation to your
          given email id, please have a look. Have a great Day.{' '}
        </div>
      </div>
      <div className={styles.buttonWrapper}>
        <Button text="Go to Home" className={styles.gotoHome} />
      </div>
      <div className={styles.support}>
        <div>
          Need any help please visit to <a>Support Center</a>
        </div>
        <div>
          If it is taking time, you can check the status on this <a>link</a>
        </div>
      </div>
      <div className={styles.modalFooter}>
        <Icon src={imagesSvg.modalLogo} width={100} height={40} />
        <div className={styles.infoSection}>
          <a>Help & Privacy Policy</a>
          <a>Terms & Conditions</a>
        </div>
      </div>
    </div>
  );
}
